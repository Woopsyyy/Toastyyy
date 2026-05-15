import { transform } from '@babel/standalone';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';

const jsx = `
import React from 'react';
import styled from 'styled-components';

const Tooltip = () => {
  return (
    <StyledWrapper>
      <article className="card">
        <svg strokeWidth={2} viewBox="0 0 24 24"></svg>
      </article>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div\`
  .card { color: red; }
\`;

export default Tooltip;
`;

try {
  const transpiled = transform(jsx, { presets: ['env', 'react'] }).code;
  
  const requireFn = (moduleName) => {
    if (moduleName === 'react') return React;
    if (moduleName === 'styled-components') {
      const createComponent = (tag) => (template, ...args) => {
        return ({ children, ...props }) => React.createElement(tag, props, children);
      };
      const styledFn = (Component) => createComponent(Component);
      const styled = new Proxy(styledFn, {
        get: (target, prop) => {
          if (prop === '__esModule') return true;
          if (prop in target) return target[prop];
          return createComponent(prop);
        }
      });
      return { __esModule: true, default: styled };
    }
    return {};
  };

  const exports = {};
  const fn = new Function('React', 'require', 'exports', transpiled);
  fn(React, requireFn, exports);
  
  const Component = exports.default;
  const html = renderToStaticMarkup(React.createElement(Component));
  console.log("HTML:", html);
} catch (e) {
  console.error(e);
}
