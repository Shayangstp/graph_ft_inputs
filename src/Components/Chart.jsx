import React from "react";
import Tree from "react-d3-tree";

const orgChart = {
  name: "CEO",
  attributes: {
    input1: "",
    input2: "",
    input3: "",
  },
  children: [
    {
      name: "Manager",
      attributes: {
        department: "Production",
        input1: "",
        input2: "",
        input3: "",
      },
      children: [
        {
          name: "Foreman",
          attributes: {
            department: "Fabrication",
            input1: "",
            input2: "",
            input3: "",
          },
          children: [
            {
              name: "Worker",
              attributes: {
                input1: "",
                input2: "",
                input3: "",
              },
            },
          ],
        },
        {
          name: "Foreman",
          attributes: {
            department: "Assembly",
            input1: "",
            input2: "",
            input3: "",
          },
          children: [
            {
              name: "Worker",
              attributes: {
                input1: "",
                input2: "",
                input3: "",
              },
            },
          ],
        },
      ],
    },
  ],
};

const Chart = () => {
  const renderNode = ({ nodeData }) => {
    const { name, attributes } = nodeData;

    return (
      <div>
        <p>{name}</p>
        <input
          type="text"
          value={attributes.input1}
          onChange={(e) => handleChange(nodeData, "input1", e.target.value)}
          placeholder="Input 1"
        />
        <input
          type="text"
          value={attributes.input2}
          onChange={(e) => handleChange(nodeData, "input2", e.target.value)}
          placeholder="Input 2"
        />
        <input
          type="text"
          value={attributes.input3}
          onChange={(e) => handleChange(nodeData, "input3", e.target.value)}
          placeholder="Input 3"
        />
      </div>
    );
  };

  const handleChange = (nodeData, attribute, value) => {
    nodeData.attributes[attribute] = value;
  };

  return (
    <div id="treeWrapper" style={{ width: "100vw", height: "100vh" }}>
      <Tree data={orgChart} renderCustomNodeElement={renderNode} />
    </div>
  );
};

export default Chart;
