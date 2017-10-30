import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import ValidateBadge from "../icons/ValidateBadge";
import DateFormat from "../DateFormat";
import AccountName from "../AccountName";
import ApprovalStatus from "../ApprovalStatus";

function PendingAccountApprove(props) {
  const { accounts, open, approved, approvers, user } = props;
  if (accounts.length === 0) {
    return <p>There are no accounts to approve</p>;
  }

  const nbCurrencies = _.size(
    _.groupBy(accounts, account => account.currency.family)
  );

  return (
    <div className="pending-request-list">
      {!approved && (
        <div>
          <p className="header dark">
            {accounts.length === 1 ? (
              <span>1 account</span>
            ) : (
              <span>{accounts.length} accounts</span>
            )}
            <span>{nbCurrencies}</span>
          </p>
          <p className="header light">
            <span>pending approval</span>
            {nbCurrencies === 1 ? (
              <span>currency</span>
            ) : (
              <span>currencies</span>
            )}
          </p>
        </div>
      )}
      {_.map(accounts, account => {
        return (
          <div
            className={`pending-request ${approved ? "watch" : ""}`}
            key={account.id}
            onClick={() => open("account", account, approved)}
          >
            <div>
              <span className="request-date-creation">
                <DateFormat date={account.creation_time} />
              </span>
              <span className="request-name">
                <AccountName name={account.name} currency={account.currency} />
              </span>
            </div>
            <div>
              <ApprovalStatus
                approved={account.approved}
                approvers={approvers}
                user_hash={user.pub_key}
              />
              <span className="request-currency">
                {account.currency.family}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

PendingAccountApprove.defaultProps = {
  approved: false,
  approvers: []
};

PendingAccountApprove.propTypes = {
  accounts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ).isRequired,
  open: PropTypes.func.isRequired,
  approved: PropTypes.bool,
  approvers: PropTypes.arrayOf(PropTypes.shape({}))
};

export default PendingAccountApprove;
