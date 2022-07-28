import { createRoot, Root } from 'react-dom/client';
export {render} from './render';

// A map of all rendered React 18 nodes
const nodes = new Map<Element, Root>();

const getReactRoot = (el: Element): Root => {
  let root = nodes.get(el);
  if (!root) {
    root = createRoot(el);
    nodes.set(el, root);
  }
  return root;
};

export async function renderToDOM(
  { storyFn },
  domElement
) {
  const root = getReactRoot(domElement);
  root.render(storyFn());
  return () => {
    nodes.delete(domElement);
    root.unmount();
  };
}
