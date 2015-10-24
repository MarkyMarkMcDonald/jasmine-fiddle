function fmtNode(node) {
  if (node.type === 'CallExpression') {
    debugger;
    return node.callee.object.name + "." + node.callee.property.name;
  } else {
    console.log("IDK how to formatz a " + node.type);
  }
}

function createTests(ast) {
  var ret = {};
  ast.body.forEach(function(node) {
    if (node.type === 'FunctionDeclaration') {
      ret[node.id.name] = createTests(node.body);
    } else if (node.type === 'Program') {
      return createTests(node.body);
    } else if (node.type === 'IfStatement'){
      var key = "when " + fmtNode(node.test) + " is true";
      ret[key] = createTests(node.consequent);
      if (node.alternate != null) {
        key = "when " + fmtNode(node.test) + " is false";
        ret[key] = createTests(node.alternate);
      }
    } else if (node.type === 'ExpressionStatement') {
      var key = "calls " + fmtNode(node.expression);
      ret[key] = "expect(" + fmtNode(node.expression) + ").toHaveBeenCalled();";
    } else {
      console.log("I don't know how to handle " + node.type);
    }
  });
  return ret;
}

app.controller('ctrl', function($scope) {
  $scope.code = 'function rewardGoodChildren(child) {\n' +
    'if (child.isGood()) {\n' +
    '  child.reward();\n' +
    '  child.giveCookie();\n' +
    '} else {\n' +
    '  child.spank();\n' +
    '  child.giveCoal();\n' +
    '}\n' +
  '}\n'

    $scope.$watch('code', function(newValue) {
    var ast = esprima.parse(newValue);
    $scope.tests = JSON.stringify(createTests(ast), null, 2)
  });

  $scope.aceConfig = {
    mode: "javascript",
    workerPath: "./",
    advanced: {
      fontSize: '16px'
    }
  };
});


// {
// "type": "Program",
// "body": [
// {
// "type": "FunctionDeclaration",
// "id": {
// "type": "Identifier",
// "name": "kitten"
// },
// "params": [],
// "defaults": [],
// "body": {
// "type": "BlockStatement",
// "body": [
// {
// "type": "ReturnStatement",
// "argument": {
// "type": "BinaryExpression",
// "operator": "+",
// "left": {
// "type": "Literal",
// "value": "kitten",
// "raw": "\"kitten\""
// },
// "right": {
// "type": "Literal",
// "value": 8,
// "raw": "8"
// }
// }
// }
// ]
// },
// "rest": null,
// "generator": false,
// "expression": false
// },
// {
// "type": "EmptyStatement"
// }
// ]
// }
