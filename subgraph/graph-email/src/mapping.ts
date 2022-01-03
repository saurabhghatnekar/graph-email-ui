import {
  NewMessage as NewMessageEvent,
  newRegistration as newRegistrationEvent
} from "../generated/GraphBasedEmailSystem/GraphBasedEmailSystem"
import { NewMessage, newRegistration } from "../generated/schema"

export function handleNewMessage(event: NewMessageEvent): void {
  let entity = new NewMessage(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._fromAddress = event.params._fromAddress
  entity._toAddress = event.params._toAddress
  entity._ipfsLink = event.params._ipfsLink
  entity.isEncrypted = event.params.isEncrypted
  entity.time = event.params.time
  entity.save()
}

export function handlenewRegistration(event: newRegistrationEvent): void {
  let entity = new newRegistration(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity._toAddress = event.params._toAddress
  entity._publicKey = event.params._publicKey
  entity.time = event.params.time
  entity.save()
}
