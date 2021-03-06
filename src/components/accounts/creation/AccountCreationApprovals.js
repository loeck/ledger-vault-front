//@flow
import React from "react";
import InfoModal from "../../InfoModal";
import DialogButton from "../../buttons/DialogButton";
import { connect } from "react-redux";
import { addMessage } from "../../../redux/modules/alerts";
import InputTextWithUnity from "../../InputTextWithUnity";
import type { Member } from "../../../data/types";

const mapDispatchToProps = dispatch => ({
  onAddMessage: (title, content, type) =>
    dispatch(addMessage(title, content, type))
});

function AccountCreationApprovals(props: {
  members: Member[],
  approvals: number,
  switchInternalModal: Function,
  onAddMessage: (t: string, m: string, ty: string) => void,
  setApprovals: (v: string) => void
}) {
  const {
    onAddMessage,
    switchInternalModal,
    approvals,
    setApprovals,
    members
  } = props;

  const submit = () => {
    if (parseInt(approvals, 10) <= members.length) {
      switchInternalModal("main");
    } else {
      onAddMessage(
        "Error",
        "Number of approvals cannot exceed numbers of members",
        "error"
      );
    }
  };

  return (
    <div className="small-modal wrapper">
      <header>
        <h3>Approvals</h3>
      </header>
      <div className="content">
        <InputTextWithUnity
          label="Amount"
          hasError={approvals > members.length}
          field={
            <input
              type="text"
              id="approval-field"
              value={approvals}
              onChange={e => setApprovals(e.target.value)}
            />
          }
        >
          <span className="count">approvals from {members.length} members</span>
        </InputTextWithUnity>
        <InfoModal>
          Approvals define the number of required signatures from the group of
          members allowed to approve outgoing operations.
        </InfoModal>
      </div>

      <div className="footer">
        <DialogButton right highlight onTouchTap={submit}>
          Done
        </DialogButton>
      </div>
    </div>
  );
}

export default connect(undefined, mapDispatchToProps)(AccountCreationApprovals);
