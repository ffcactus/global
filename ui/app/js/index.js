import React from 'react';
import { render } from 'react-dom';
import HelloWorld from './hello';

// require('react');
// require('./section');

var sectionTree = {
  "name": "root",
  "id": "id_0001",
  "children": [
    {
      "name": "folder0",
      "id": "id_0002",
      "children": [
        {
          "name": "folder1",
          "id": "id_0003",
          "children": []
        },
        {
          "name": "folder2",
          "id": "id_0004",
          "children": [
            {
              "name": "folder3",
              "id": "id_0005",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "name": "folder4",
      "id": "id_0006",
      "children": [
        {
          "name": "folder5",
          "id": "id_0007",
          "children": []
        },
        {
          "name": "folder2",
          "id": "id_0008",
          "children": [
            {
              "name": "folder3",
              "id": "id_0009",
              "children": []
            }
          ]
        }
      ]
    }
  ]
};

React.render(
  <HelloWorld/>,
  document.body
);
