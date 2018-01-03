//@flow
import React, { Component } from "react";
import debounce from "lodash/debounce";
import { Switch, Route, Redirect } from "react-router-dom";
import { NavLink } from "react-router-relative-link";
import Select from "material-ui/Select";
import { MenuItem } from "material-ui/Menu";
import { withStyles } from "material-ui/styles";

import SelectTab from "../../components/SelectTab/SelectTab";
import FiatUnits from "../../fiat-units";
import connectData from "../../restlay/connectData";
import type { RestlayEnvironment } from "../../restlay/connectData";
import AccountsQuery from "../../api/queries/AccountsQuery";
import SettingsDataQuery from "../../api/queries/SettingsDataQuery";
import SaveAccountSettingsMutation from "../../api/mutations/SaveAccountSettingsMutation";
import SpinnerCard from "../../components/spinners/SpinnerCard";
import DialogButton from "../buttons/DialogButton";

import BadgeSecurity from "../BadgeSecurity";
import RateLimiterValue from "../RateLimiterValue";
import TimeLockValue from "../TimeLockValue";
import SettingsTextField from "../SettingsTextField";

import {
  BigSecurityTimeLockIcon,
  BigSecurityMembersIcon,
  BigSecurityRateLimiterIcon,
  BigSecurityAutoExpireIcon
} from "../icons";

import type {
  Account,
  SecurityScheme,
  AccountSettings
} from "../../data/types";

import type { Response as SettingsDataQueryResponse } from "../../api/queries/SettingsDataQuery";

const { REACT_APP_SECRET_CODE } = process.env;

const styles = {
  base: {
    width: 690,
    height: 600,
    display: "flex",
    flexDirection: "row",
    overflowY: "hidden",
    position: "relative",

    h2: {
      fontSize: 18,
      fontWeight: "normal",
      lineHeight: "2em"
    },
    h3: {
      fontSize: 11,
      lineHeight: "2em",
      fontWeight: 600,
      textTransform: "uppercase"
    },

    "&> aside": {
      width: 250,
      backgroundColor: "#f9f9f9",
      display: "flex",
      flexDirection: "column",
      overflowY: "scroll",
      padding: "20px 30px"
    }
  },
  accounts: {
    flex: 1
  },
  navAccount: {
    display: "block",
    padding: "20px 0",
    borderBottom: "1px solid #e2e2e2",
    position: "relative",
    "&> *": {
      opacity: 0.5
    }
  }
};

class NavAccount extends Component<{
  account: Account,
  classes: { [_: $Keys<typeof styles>]: string }
}> {
  render() {
    const { account, classes } = this.props;
    return (
      <NavLink
        className={classes.navAccount}
        style={{ color: account.currency.color }}
        to={account.id}
      >
        <span className="name">{account.name}</span>
        <span className="currency">{account.currency.name}</span>
      </NavLink>
    );
  }
}

class SettingsField extends Component<{
  label: string,
  children: React$Node
}> {
  render() {
    const { children, label } = this.props;
    return (
      <label className="settings-field">
        <span className="label">{label}</span>
        <span className="body">{children}</span>
      </label>
    );
  }
}

class SecuritySchemeView extends Component<{
  securityScheme: SecurityScheme
}> {
  render() {
    const {
      securityScheme: {
        quorum,
        approvers,
        time_lock,
        rate_limiter,
        auto_expire
      }
    } = this.props;
    return (
      <div className="security-scheme">
        <BadgeSecurity
          icon={<BigSecurityMembersIcon />}
          label="Members"
          value={`${approvers.length} of ${quorum}`}
        />
        <BadgeSecurity
          icon={<BigSecurityTimeLockIcon />}
          label="Time-lock"
          disabled={!time_lock}
          value={<TimeLockValue time_lock={time_lock} />}
        />
        <BadgeSecurity
          icon={<BigSecurityRateLimiterIcon />}
          label="Rate Limiter"
          disabled={!rate_limiter}
          value={
            rate_limiter && (
              <RateLimiterValue
                max_transaction={rate_limiter.max_transaction}
                time_slot={rate_limiter.time_slot}
              />
            )
          }
        />
        <BadgeSecurity
          icon={<BigSecurityAutoExpireIcon />}
          label="Auto-expire"
          disabled={!auto_expire}
          value={<TimeLockValue time_lock={auto_expire} />}
        />
      </div>
    );
  }
}

type Props = {
  settingsData: SettingsDataQueryResponse,
  account: Account,
  restlay: RestlayEnvironment
};
type State = {
  name: string,
  settings: AccountSettings
};
class AccountSettingsEdit extends Component<Props, State> {
  constructor({ account }: Props) {
    super();
    const { name, settings } = account;
    this.state = {
      name,
      settings
    };
  }
  debouncedCommit = debounce(() => {
    const { props: { restlay, account }, state } = this;
    const m = new SaveAccountSettingsMutation({ ...state, account });
    restlay.commitMutation(m);
  }, 300);
  update = (update: $Shape<State>) => {
    this.setState(update);
    this.debouncedCommit();
  };
  onAccountNameChange = (e: SyntheticInputEvent<>) => {
    const name = e.target.value;
    this.update({ name });
  };
  onUnitIndexChange = (unitIndex: number) => {
    if (unitIndex !== this.state.settings.unitIndex) {
      this.update({
        settings: {
          ...this.state.settings,
          unitIndex
        }
      });
    }
  };
  onBlockchainExplorerChange = ({
    target: { value: blockchainExplorer }
  }: *) => {
    this.update({
      settings: {
        ...this.state.settings,
        blockchainExplorer
      }
    });
  };
  onCountervalueSourceChange = ({
    target: { value: countervalueSource }
  }: *) => {
    this.update({
      settings: {
        ...this.state.settings,
        countervalueSource
      }
    });
  };
  onFiatChange = ({ target: { value: fiat } }: *) => {
    this.update({
      settings: {
        ...this.state.settings,
        fiat
      }
    });
  };
  render() {
    const { account, settingsData } = this.props;
    const { name, settings } = this.state;
    const countervalueSourceData = settingsData.countervalueSources.find(
      c => c.id === settings.countervalueSource
    );
    return (
      <div className="account-settings">
        <h3>Security scheme</h3>
        <SecuritySchemeView securityScheme={account.security_scheme} />
        <section>
          <h3>General</h3>
          <SettingsField label="Account Name">
            <SettingsTextField
              name="last_name"
              value={name}
              hasError={!name}
              onChange={this.onAccountNameChange}
            />
          </SettingsField>
          <SettingsField label="Units">
            <SelectTab
              tabs={account.currency.units.map(elem => elem.name)}
              onChange={this.onUnitIndexChange}
              selected={settings.unitIndex}
              theme="inline"
            />
          </SettingsField>
          <SettingsField label="Blockchain Explorer">
            <Select
              value={settings.blockchainExplorer}
              onChange={this.onBlockchainExplorerChange}
              fullWidth
              disableUnderline
            >
              {settingsData.blockchainExplorers.map(({ id }) => (
                <MenuItem disableRipple key={id} value={id}>
                  {id}
                </MenuItem>
              ))}
            </Select>
          </SettingsField>
        </section>
        <section>
          <h3>Countervalue</h3>
          <SettingsField label="Source">
            <Select
              value={settings.countervalueSource}
              onChange={this.onCountervalueSourceChange}
              fullWidth
              disableUnderline
            >
              {settingsData.countervalueSources.map(({ id }) => (
                <MenuItem disableRipple key={id} value={id}>
                  {id}
                </MenuItem>
              ))}
            </Select>
          </SettingsField>
          {countervalueSourceData ? (
            <SettingsField label="Fiat Currency">
              <Select
                value={settings.fiat}
                onChange={this.onFiatChange}
                fullWidth
                disableUnderline
              >
                {countervalueSourceData.fiats.map(fiat => (
                  <MenuItem disableRipple key={fiat} value={fiat}>
                    {fiat} - {FiatUnits[fiat].name}
                  </MenuItem>
                ))}
              </Select>
            </SettingsField>
          ) : null}
        </section>
      </div>
    );
  }
}

class SettingsModal extends Component<{
  settingsData: SettingsDataQueryResponse,
  accounts: Account[],
  restlay: RestlayEnvironment,
  close: Function,
  classes: { [_: $Keys<typeof styles>]: string }
}> {
  render() {
    const { settingsData, accounts, restlay, close, classes } = this.props;
    return (
      <div className={classes.base}>
        <aside>
          <h3>ACCOUNTS</h3>
          <div className={classes.accounts}>
            {accounts.map(account => (
              <NavAccount
                account={account}
                key={account.id}
                classes={classes}
              />
            ))}
          </div>
          <span className="version">
            {REACT_APP_SECRET_CODE || "unversioned"}
          </span>
          <a className="support" href="mailto:support@ledger.fr">
            support
          </a>
        </aside>
        <div className="body">
          <h2>Settings</h2>
          {accounts.length > 0 ? (
            <Switch>
              <Route
                path="*/settings/:id"
                render={props => {
                  const account = accounts.find(
                    a => a.id === props.match.params.id
                  );
                  return account ? (
                    <AccountSettingsEdit
                      {...props}
                      settingsData={settingsData}
                      key={account.id}
                      account={account}
                      restlay={restlay}
                    />
                  ) : null;
                }}
              />
              <Route
                render={() => <Redirect to={"settings/" + accounts[0].id} />}
              />
            </Switch>
          ) : null}
          <footer>
            <DialogButton highlight right onTouchTap={() => close(true)}>
              Done
            </DialogButton>
          </footer>
        </div>
      </div>
    );
  }
}

const RenderLoading = () => (
  <div className="modal settings">
    <SpinnerCard />
  </div>
);

export default connectData(withStyles(styles)(SettingsModal), {
  RenderLoading,
  queries: {
    settingsData: SettingsDataQuery,
    accounts: AccountsQuery
  }
});
