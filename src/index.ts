import ReactDOM from 'react-dom';
export {render} from './render';

export async function renderToDOM(
  { storyFn },
  domElement
) {
  await new Promise<void>((resolve) => 
    ReactDOM.render(storyFn(), domElement, () => resolve())
  );
  return () => ReactDOM.unmountComponentAtNode(domElement);
}
