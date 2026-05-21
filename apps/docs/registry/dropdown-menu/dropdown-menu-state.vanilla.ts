// Dropdown reuses Popover machine as-is — same state shape.
export {
  createPopoverMachine  as createDropdownMachine,
  bindPopoverEffects    as bindDropdownEffects,
  type PopoverMachine   as DropdownMachine,
  type PopoverEffectorHandlers as DropdownEffectorHandlers,
  type PopoverSlotRefs  as DropdownSlotRefs,
} from "../popover/popover-state.vanilla";
