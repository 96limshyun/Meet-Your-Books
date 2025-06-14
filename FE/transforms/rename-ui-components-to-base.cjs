module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const RENAME_MAP = {
    Button: 'BaseButton',
    Heading: 'BaseHeading',
    Image: 'BaseImage',
    Input: 'BaseInput',
    Text: 'BaseText',
  };

  root.find(j.ImportDeclaration).forEach(path => {
    const isFromTarget =
      path.node.source.value.includes('@components/ui')

    if (isFromTarget) {
      path.node.specifiers.forEach(spec => {
        if (spec.type === 'ImportSpecifier' && RENAME_MAP[spec.imported.name]) {
          const newName = RENAME_MAP[spec.imported.name];
          spec.imported.name = newName;

          if (spec.local.name === spec.imported.name) {
            spec.local.name = newName;
          }
        }
      });
    }
  });

  root.find(j.JSXIdentifier).forEach(path => {
    const oldName = path.node.name;
    const newName = RENAME_MAP[oldName];
    const parent = path.parent.node;

    const isJSXTag =
      parent.type === 'JSXOpeningElement' || parent.type === 'JSXClosingElement';

    const isStyledComponent =
      parent.type === 'TaggedTemplateExpression' ||
      (parent.type === 'CallExpression' &&
        parent.callee &&
        parent.callee.name === 'twc');

    if (newName && isJSXTag && !isStyledComponent) {
      path.node.name = newName;
    }
  });

  return root.toSource({ quote: 'double' });
};
