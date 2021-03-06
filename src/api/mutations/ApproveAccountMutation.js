//@flow
import Mutation from "../../restlay/Mutation";
import schema from "../../data/schema";
import type { Account } from "../../data/types";
import { success, error } from "../../formatters/notification";

type Input = {
  accountId: string
};

type Response = Account;

export default class ApproveAccountMutation extends Mutation<Input, Response> {
  uri = `/accounts/${this.props.accountId}`;
  method = "PUT";
  responseSchema = schema.Account;

  getSuccessNotification() {
    return success("account request", "approved");
  }

  getErrorNotification(e: Error) {
    return error("account request", "approved", e);
  }
}
