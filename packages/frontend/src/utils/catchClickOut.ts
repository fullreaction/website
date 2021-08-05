export const catchClickOut = (el: HTMLElement, callback: (state: boolean) => void) => {
  let currentOut: boolean | null = null;
  window.addEventListener(
    'click',
    (e: any) => {
      const out = !e.path.includes(el);
      if (out !== currentOut) {
        currentOut = out;
        callback(out);
      }
    },
    { capture: true },
  );
};
