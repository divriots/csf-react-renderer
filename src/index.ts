import ReactDOM from 'react-dom';
import React from 'react';
export {render} from './render';

export async function renderToDOM(
  {
    storyContext,
    unboundStoryFn,
  },
  domElement
) {
  await new Promise<void>((resolve) => 
    ReactDOM.render(React.createElement(unboundStoryFn, storyContext), domElement, () => resolve())
  );
  return () => ReactDOM.unmountComponentAtNode(domElement);
}
