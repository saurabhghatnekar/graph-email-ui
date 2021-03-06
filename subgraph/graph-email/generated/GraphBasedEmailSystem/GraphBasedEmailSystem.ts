// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class NewMessage extends ethereum.Event {
  get params(): NewMessage__Params {
    return new NewMessage__Params(this);
  }
}

export class NewMessage__Params {
  _event: NewMessage;

  constructor(event: NewMessage) {
    this._event = event;
  }

  get _fromAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _toAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _ipfsLink(): string {
    return this._event.parameters[2].value.toString();
  }

  get isEncrypted(): string {
    return this._event.parameters[3].value.toString();
  }

  get time(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class newRegistration extends ethereum.Event {
  get params(): newRegistration__Params {
    return new newRegistration__Params(this);
  }
}

export class newRegistration__Params {
  _event: newRegistration;

  constructor(event: newRegistration) {
    this._event = event;
  }

  get _toAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _publicKey(): string {
    return this._event.parameters[1].value.toString();
  }

  get time(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class GraphBasedEmailSystem extends ethereum.SmartContract {
  static bind(address: Address): GraphBasedEmailSystem {
    return new GraphBasedEmailSystem("GraphBasedEmailSystem", address);
  }

  GetReceiverPublicKey(_receiver: Address): string {
    let result = super.call(
      "GetReceiverPublicKey",
      "GetReceiverPublicKey(address):(string)",
      [ethereum.Value.fromAddress(_receiver)]
    );

    return result[0].toString();
  }

  try_GetReceiverPublicKey(_receiver: Address): ethereum.CallResult<string> {
    let result = super.tryCall(
      "GetReceiverPublicKey",
      "GetReceiverPublicKey(address):(string)",
      [ethereum.Value.fromAddress(_receiver)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  GetSenderPublicKey(): string {
    let result = super.call(
      "GetSenderPublicKey",
      "GetSenderPublicKey():(string)",
      []
    );

    return result[0].toString();
  }

  try_GetSenderPublicKey(): ethereum.CallResult<string> {
    let result = super.tryCall(
      "GetSenderPublicKey",
      "GetSenderPublicKey():(string)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }
}

export class RegisterCall extends ethereum.Call {
  get inputs(): RegisterCall__Inputs {
    return new RegisterCall__Inputs(this);
  }

  get outputs(): RegisterCall__Outputs {
    return new RegisterCall__Outputs(this);
  }
}

export class RegisterCall__Inputs {
  _call: RegisterCall;

  constructor(call: RegisterCall) {
    this._call = call;
  }

  get _publicKey(): string {
    return this._call.inputValues[0].value.toString();
  }
}

export class RegisterCall__Outputs {
  _call: RegisterCall;

  constructor(call: RegisterCall) {
    this._call = call;
  }
}

export class SendMessageCall extends ethereum.Call {
  get inputs(): SendMessageCall__Inputs {
    return new SendMessageCall__Inputs(this);
  }

  get outputs(): SendMessageCall__Outputs {
    return new SendMessageCall__Outputs(this);
  }
}

export class SendMessageCall__Inputs {
  _call: SendMessageCall;

  constructor(call: SendMessageCall) {
    this._call = call;
  }

  get _toAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _ipfsLink(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _isEncrypted(): string {
    return this._call.inputValues[2].value.toString();
  }
}

export class SendMessageCall__Outputs {
  _call: SendMessageCall;

  constructor(call: SendMessageCall) {
    this._call = call;
  }
}
