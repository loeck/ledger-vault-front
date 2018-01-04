// @flow
import React, { Component } from "react";
import { Overscroll } from "../../";
import { withRouter, Redirect } from "react-router";
import connectData from "restlay/connectData";
import Tabs, { Tab } from "material-ui/Tabs";
import { withStyles } from "material-ui/styles";
import Footer from "../../approve/Footer";
// import CircularProgress from "material-ui/CircularProgress";
import ApprovalPercentage from "components/ApprovalPercentage";
import AccountApproveDetails from "./AccountApproveDetails";
import AccountApproveMembers from "./AccountApproveMembers";
import ModalLoading from "components/ModalLoading";
import AccountApproveApprovals from "./AccountApproveApprovals";
import AccountQuery from "api/queries/AccountQuery";
import ApproversQuery from "api/queries/ApproversQuery";
import ProfileQuery from "api/queries/ProfileQuery";
import MembersQuery from "api/queries/MembersQuery";
import type { Member, Account } from "data/types";
import modals from "shared/modals";

const styles = {
  base: {
    ...modals.base,
    width: "440px",
    height: "615px"
  }
};

type Props = {
  members: Array<Member>,
  profile: Member,
  approvers: Array<Member>,
  account: Account,
  close: Function,
  approve: Function,
  aborting: Function,
  classes: { [_: $Keys<typeof styles>]: string },
  match: *
};

class AccountApprove extends Component<Props, { value: number }> {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const {
      members,
      profile,
      approvers,
      account,
      close,
      approve,
      aborting,
      classes
    } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.base}>
        <header>
          <h2>Account request</h2>
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Details" disableRipple />
            <Tab label="Members" disableRipple />
            <Tab label="approvers" disableRipple />
          </Tabs>
        </header>
        {value === 0 && (
          <div>
            <AccountApproveDetails account={account} approvers={approvers} />
            <Footer
              close={close}
              approve={approve}
              aborting={aborting}
              approved={account.approved.indexOf(profile.pub_key) > -1}
            />
          </div>
        )}
        {value === 1 && (
          <div>
            <Overscroll top={40} bottom={100}>
              <AccountApproveMembers members={members} account={account} />
            </Overscroll>
            <Footer
              close={close}
              approve={approve}
              aborting={aborting}
              approved={account.approved.indexOf(profile.pub_key) > -1}
            />
          </div>
        )}
        {value === 2 && (
          <div>
            <Overscroll top={40} bottom={100}>
              <AccountApproveApprovals
                approvers={approvers}
                account={account}
              />
            </Overscroll>
            <Footer
              close={close}
              approve={approve}
              aborting={aborting}
              approved={account.approved.indexOf(profile.pub_key) > -1}
              percentage={
                <ApprovalPercentage
                  approvers={approvers}
                  approved={account.approved}
                />
              }
            />
          </div>
        )}
      </div>
    );
  }
}

const RenderError = () => <Redirect to="/pending" />;

const connected = connectData(withStyles(styles)(AccountApprove), {
  RenderError,
  queries: {
    account: AccountQuery,
    members: MembersQuery,
    approvers: ApproversQuery,
    profile: ProfileQuery
  },
  propsToQueryParams: props => ({ accountId: props.match.params.id || "" }),
  RenderLoading: ModalLoading
});

export default withRouter(connected);
