// Dropdown reuses Popover machine as-is — same Closed/Opening/Open/Closing states.
// Item selection is ephemeral UI concern, no machine needed for the spike.
// Keyboard navigation is deferred to a follow-up.
export {
  createPopoverMachine as createDropdownMachine,
  bindPopoverEffects as bindDropdownEffects,
  popoverEffects as dropdownEffects,
  type PopoverMachine as DropdownMachine,
  type PopoverEffectorHandlers as DropdownEffectorHandlers,
} from "../popover/popover.state";
