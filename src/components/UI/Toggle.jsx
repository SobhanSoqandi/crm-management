import { Switch } from "@headlessui/react";

function Toggle({ label, enabled, onChange }) {
  return (
    <Switch.Group>
      <div className="flex items-center gap-x-2">
        <Switch
          checked={enabled}
          onChange={onChange}
          className={`${
            enabled ? "bg-emerald-600" : "bg-gray-300"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-4 focus:ring-emerald-100`}
        >
          <span
            className={`${
              enabled ? "-translate-x-6" : "-translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform`}
          />
        </Switch>
        <Switch.Label>{label}</Switch.Label>
      </div>
    </Switch.Group>
  );
}
export default Toggle;

