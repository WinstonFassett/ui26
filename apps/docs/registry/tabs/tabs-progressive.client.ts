class Ui26Tabs extends HTMLElement {
  connectedCallback() {
    const inputs = [...this.children].filter(
      (c): c is HTMLInputElement => c.tagName === "INPUT" && (c as HTMLInputElement).type === "radio"
    );
    const tablist = this.querySelector(":scope > .tablist");
    const labels = tablist ? [...tablist.querySelectorAll<HTMLElement>(":scope > [data-tab-index]")] : [];
    const panels = [...this.querySelectorAll<HTMLElement>(":scope > [role='tabpanel']")];

    const sync = () => {
      const activeIdx = inputs.findIndex((r) => r.checked);
      labels.forEach((l, i) => {
        const active = i === activeIdx;
        l.setAttribute("aria-selected", String(active));
        l.setAttribute("tabindex", active ? "0" : "-1");
        l.dataset.state = active ? "active" : "inactive";
      });
      panels.forEach((p, i) => {
        p.dataset.state = i === activeIdx ? "active" : "inactive";
      });
    };

    inputs.forEach((input, i) => {
      input.addEventListener("change", () => {
        sync();
        labels[i]?.focus();
      });
    });

    labels.forEach((label, i) => {
      label.addEventListener("keydown", (e) => {
        const next =
          e.key === "ArrowRight" ? i + 1 :
          e.key === "ArrowLeft" ? i - 1 :
          e.key === "Home" ? 0 :
          e.key === "End" ? inputs.length - 1 :
          null;
        if (next === null || !inputs[next]) return;
        e.preventDefault();
        inputs[next].checked = true;
        sync();
        labels[next]?.focus();
      });
    });

    sync();
  }
}

if (!customElements.get("ui26-tabs")) {
  customElements.define("ui26-tabs", Ui26Tabs);
}
