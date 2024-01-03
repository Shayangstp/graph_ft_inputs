import React, { useState } from "react";
import Tree from "react-d3-tree";
import orgChartJson from "./data/org-chart.json";
import { useCenteredTree } from "./Components/Helper";
import { Button, Form, Row } from "react-bootstrap";

// 1/Identify the parent map to which you want to add the submap.
// 2/Retrieve the ID of the parent map.
// 3/Create the submap object with the desired data.
// 4/Add the submap object to the "children" array of the parent map using the ID

const containerStyles = {
  width: "100vw",
  height: "100vh",
};

const App = () => {
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const renderForeignObjectNode = ({
    nodeDatum,
    toggleNode,
    foreignObjectProps,
  }) => (
    <g>
      {/* dots can be change */}
      <circle r={12}></circle>
      {/* /foreignObject` requires width & height to be explicitly set */}
      <foreignObject {...foreignObjectProps}>
        <div id="container" className="p-3" style={{ background: "#d6d6d6" }}>
          <div
            id="header"
            className="d-flex align-items-start justify-content-between"
          >
            <div id="nameAndCode">
              {/* data from api */}
              <h3>{nodeDatum.name}</h3>
              <p>{nodeDatum.code}</p>
            </div>
            <Button className="mt-2" size="sm">
              file
            </Button>
          </div>
          <div>
            {nodeDatum.children && (
              <div className="mt-2">
                <div className="d-flex justify-content-end">
                  {/* /when subMap dosent exist the button for expand not showing */}
                  {/* expand the subMap */}
                  {nodeDatum.children.length !== 0 ? (
                    <Button className="me-2" onClick={toggleNode} size="sm">
                      {nodeDatum.__rd3t.collapsed ? "مشاهده" : "بستن"}
                    </Button>
                  ) : null}
                  {/* add subMap */}
                  <Button
                    className="me-2 px-3"
                    size="sm"
                    onClick={() => {
                      setSelectedNodeId(nodeDatum.id);
                    }}
                  >
                    +
                  </Button>
                </div>
                <div id="form">
                  {/* if subMap dosent exit the expand dosent appear */}
                  {selectedNodeId === nodeDatum.id && (
                    <Form>
                      <Row>
                        <Form.Group>
                          <Form.Label>نام نقشه :</Form.Label>
                          <Form.Control />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>نام نقشه :</Form.Label>
                          <Form.Control />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>آپلود فایل :</Form.Label>
                          <Form.Control />
                          <file />
                        </Form.Group>
                        <Button
                          className="mt-2"
                          size="sm"
                          onClick={() => {
                            // have to get id and add the specefic id in the dataBase 
                            console.log("add");
                          }}
                        >
                          افزودن
                        </Button>
                      </Row>
                    </Form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </foreignObject>
    </g>
  );
  const [translate, containerRef] = useCenteredTree();
  //size --> each node from each other
  const nodeSize = { x: 500, y: 500 };
  //size of each from
  const foreignObjectProps = {
    width: 400,
    height: 400,
    x: 20,
  };
  return (
    // rtl dosent needed remove it 
    <div style={containerStyles} ref={containerRef} dir="rtl">
      <Tree
        data={orgChartJson}
        translate={translate}
        nodeSize={nodeSize}
        renderCustomNodeElement={(rd3tProps) =>
          renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
        }
        // change the graph direction 
        orientation="vertical"
      />
    </div>
  );
};

export default App;
