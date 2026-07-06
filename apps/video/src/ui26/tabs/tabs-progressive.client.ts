import { createTabsMachine, getSlotProps } from "./tabs-machine.vanilla";

class Ui26Tabs extends HTMLElement {
  private machine: ReturnType<typeof createTabsMachine> | null = null;
  private unsub: (() => void) | null = null;

  connectedCallback() {
    const inputs = [...this.children].filter(
      (c): c is HTMLInputElement => c.tagName === "INPUT" && (c as HTMLInputElement).type === "radio",
    );
    const tablist = this.querySelector(":scope > .tablist");
    const labels = tablist
      ? [...tablist.querySelectorAll<HTMLElement>(":scope > [data-tab-index]")]
      : [];
    const panels = [...this.querySelectorAll<HTMLElement>(":scope > [role='tabpanel']")];

    // Atom is the JS source of truth; index serialized as string.
    const initialIdx = Math.max(0, inputs.findIndex((r) => r.checked));
    this.machine = createTabsMachine(String(initialIdx));

    const applyDom = (activeIdx: number) => {
      // Sync radio :checked (atom -> DOM)
      inputs.forEach((r, i) => {
        if (r.checked !== (i === activeIdx)) r.checked = i === activeIdx;
      });
      labels.forEach((l, i) => {
        const value = String(i);
        const trigger = getSlotProps({ activeTab: String(activeIdx) }, "trigger", value);
        for (const [k, v] of Object.entries(trigger)) {
          if (v === false) l.removeAttribute(k);
          else l.setAttribute(k, String(v));
        }
      });
      panels.forEach((p, i) => {
        const value = String(i);
        const content = getSlotProps({ activeTab: String(activeIdx) }, "content", value);
        for (const [k, v] of Object.entries(content)) {
          if (v === false) p.removeAttribute(k);
          else p.setAttribute(k, String(v));
        }
      });
    };

    this.unsub = this.machine.state.subscribe((s) => {
      const idx = Number(s.activeTab);
      if (Number.isNaN(idx)) return;
      applyDom(idx);
    });

    // DOM -> atom on radio change.
    inputs.forEach((input, i) => {
      input.addEventListener("change", () => {
        if (!input.checked) return;
        this.machine?.activateTab(String(i));
        labels[i]?.focus();
      });
    });

    // Keyboard nav on labels — drives atom, which drives DOM.
    labels.forEach((label, i) => {
      label.addEventListener("keydown", (e) => {
        const next =
          e.key === "ArrowRight" ? i + 1 :
          e.key === "ArrowLeft"  ? i - 1 :
          e.key === "Home"       ? 0 :
          e.key === "End"        ? inputs.length - 1 :
          null;
        if (next === null || !inputs[next]) return;
        e.preventDefault();
        this.machine?.activateTab(String(next));
        labels[next]?.focus();
      });
    });

    applyDom(initialIdx);
  }

  disconnectedCallback() {
    this.unsub?.();
    this.unsub = null;
    this.machine = null;
  }
}

if (!customElements.get("ui26-tabs")) {
  customElements.define("ui26-tabs", Ui26Tabs);
}
