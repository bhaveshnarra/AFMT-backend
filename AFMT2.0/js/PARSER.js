var pollutionTree = [{
        "type": "TOP EVENT",
        "id": "bda07307-d321-7209-4799-a280b9714b61",
        "x": 600,
        "y": 60,
        "width": 100,
        "height": 50,
        "alpha": 1,
        "selectable": true,
        "draggable": true,
        "angle": 0,
        "userData": {
            "Label": "Pollution",
            "inspFreq": {
                "value": 1,
                "type": "NUMBER",
                "name": "Inspection Frequency",
                "min": 1,
                "max": 10000,
                "step": 1
            }
        },
        "cssClass": "TOP EVENT",
        "ports": [{
            "type": "draw2d.InputPort",
            "id": "d34c3ff6-ad10-48f0-aaf6-6fc657b7e81f",
            "width": 10,
            "height": 10,
            "alpha": 1,
            "selectable": false,
            "draggable": true,
            "angle": 0,
            "userData": {},
            "cssClass": "draw2d_InputPort",
            "bgColor": "rgba(79,104,112,1)",
            "color": "rgba(27,27,27,1)",
            "stroke": 1,
            "dasharray": null,
            "maxFanOut": 9007199254740991,
            "name": "input0",
            "semanticGroup": "global",
            "port": "draw2d.InputPort",
            "locator": "draw2d.layout.locator.PortLocator",
            "locatorAttr": {}
        }],
        "bgColor": "rgba(0,163,246,1)",
        "color": "rgba(27,27,27,1)",
        "stroke": 1,
        "radius": 0,
        "dasharray": null,
        "vertices": [{
                "x": 650,
                "y": 60
            },
            {
                "x": 700,
                "y": 85
            },
            {
                "x": 650,
                "y": 110
            },
            {
                "x": 600,
                "y": 85
            }
        ]
    },
    {
        "type": "OR Gate",
        "id": "1b99d7cb-7bc2-2791-549e-e88b35958f7c",
        "x": 620,
        "y": 160,
        "width": 70,
        "height": 70,
        "alpha": 1,
        "selectable": true,
        "draggable": true,
        "angle": 0,
        "userData": {
            "Label": "OR Gate"
        },
        "cssClass": "OR Gate",
        "ports": [{
                "type": "draw2d.InputPort",
                "id": "ffbff9f1-c79c-e7e0-b9fd-f6bbab3e02f5",
                "width": 10,
                "height": 10,
                "alpha": 1,
                "selectable": false,
                "draggable": true,
                "angle": 0,
                "userData": {},
                "cssClass": "draw2d_InputPort",
                "bgColor": "rgba(79,104,112,1)",
                "color": "rgba(27,27,27,1)",
                "stroke": 1,
                "dasharray": null,
                "maxFanOut": 9007199254740991,
                "name": "input0",
                "semanticGroup": "global",
                "port": "draw2d.InputPort",
                "locator": "draw2d.layout.locator.PortLocator",
                "locatorAttr": {}
            },
            {
                "type": "draw2d.InputPort",
                "id": "b936fbe2-c8f2-4295-b2a9-3024a03c8c0f",
                "width": 10,
                "height": 10,
                "alpha": 1,
                "selectable": false,
                "draggable": true,
                "angle": 0,
                "userData": {},
                "cssClass": "draw2d_InputPort",
                "bgColor": "rgba(79,104,112,1)",
                "color": "rgba(27,27,27,1)",
                "stroke": 1,
                "dasharray": null,
                "maxFanOut": 9007199254740991,
                "name": "input1",
                "semanticGroup": "global",
                "port": "draw2d.InputPort",
                "locator": "draw2d.layout.locator.PortLocator",
                "locatorAttr": {}
            },
            {
                "type": "draw2d.OutputPort",
                "id": "6c764850-cd4c-de96-630d-22eedad6ab4b",
                "width": 10,
                "height": 10,
                "alpha": 1,
                "selectable": false,
                "draggable": true,
                "angle": 0,
                "userData": {},
                "cssClass": "draw2d_OutputPort",
                "bgColor": "rgba(79,104,112,1)",
                "color": "rgba(27,27,27,1)",
                "stroke": 1,
                "dasharray": null,
                "maxFanOut": 9007199254740991,
                "name": "output0",
                "semanticGroup": "global",
                "port": "draw2d.OutputPort",
                "locator": "draw2d.layout.locator.PortLocator",
                "locatorAttr": {}
            }
        ],
        "bgColor": "rgba(0,0,0,0)",
        "color": "rgba(27,27,27,1)",
        "stroke": 0,
        "radius": 0,
        "dasharray": null
    },
    {
        "type": "ATTACK EVENT",
        "id": "dfbc58d1-75d3-333f-3d77-52bf930337e8",
        "x": 240,
        "y": 480,
        "width": 100,
        "height": 50,
        "alpha": 1,
        "selectable": true,
        "draggable": true,
        "angle": 0,
        "userData": {
            "Label": "Deactivate Scada",
            "detection": {
                "value": true,
                "type": "BOOL",
                "hide": true,
                "name": ""
            },
            "enable": {
                "value": true,
                "type": "BOOL",
                "hide": true,
                "name": ""
            },
            "meanTTA": {
                "value": "45",
                "type": "SLIDER",
                "name": " Mean Time to Attack (in days)",
                "min": "1",
                "max": "365",
                "step": "1"
            },
            "detectionPercent": {
                "value": "11",
                "type": "SLIDER",
                "name": " Detection Percent",
                "min": "1",
                "max": "100",
                "step": "10"
            },
            "fixedCOA": {
                "value": "500",
                "type": "NUMBER",
                "name": " Fixed Cost of Attack ($)",
                "min": "1",
                "max": "365",
                "step": "1"
            },
            "fixedDMG": {
                "value": "1000",
                "type": "NUMBER",
                "name": " Fixed Damage ($)",
                "min": "1",
                "max": "10000",
                "step": "1"
            },
            "detectTime": {
                "value": "5",
                "type": "NUMBER",
                "name": " Detection Time (in days)",
                "min": "1",
                "max": "365",
                "step": "1"
            },
            "repairCost": {
                "value": "1000",
                "type": "NUMBER",
                "name": " Repair Cost ($)",
                "min": "1",
                "max": "100000",
                "step": "1"
            },
            "repairTime": {
                "value": "5",
                "type": "NUMBER",
                "name": " Repair Time (in days)",
                "min": "1",
                "max": "100000",
                "step": "1"
            }
        },
        "cssClass": "ATTACK EVENT",
        "ports": [{
            "type": "draw2d.OutputPort",
            "id": "8f8fbf75-1f7e-706e-6d0a-2bf52fd1fab0",
            "width": 10,
            "height": 10,
            "alpha": 1,
            "selectable": false,
            "draggable": true,
            "angle": 0,
            "userData": {},
            "cssClass": "draw2d_OutputPort",
            "bgColor": "rgba(79,104,112,1)",
            "color": "rgba(27,27,27,1)",
            "stroke": 1,
            "dasharray": null,
            "maxFanOut": 9007199254740991,
            "name": "output0",
            "semanticGroup": "global",
            "port": "draw2d.OutputPort",
            "locator": "draw2d.layout.locator.PortLocator",
            "locatorAttr": {}
        }],
        "bgColor": "rgba(160,160,160,1)",
        "color": "rgba(27,27,27,1)",
        "stroke": 1,
        "radius": 0,
        "dasharray": null
    },
    {
        "type": "ATTACK EVENT",
        "id": "9c761841-0afe-c223-2b8b-086323b41ba1",
        "x": 480,
        "y": 480,
        "width": 100,
        "height": 50,
        "alpha": 1,
        "selectable": true,
        "draggable": true,
        "angle": 0,
        "userData": {
            "Label": "Watterhammer attack",
            "detection": {
                "value": true,
                "type": "BOOL",
                "hide": true,
                "name": ""
            },
            "enable": {
                "value": true,
                "type": "BOOL",
                "hide": true,
                "name": ""
            },
            "meanTTA": {
                "value": "35",
                "type": "SLIDER",
                "name": "  Mean Time to Attack (in days)",
                "min": "1",
                "max": "365",
                "step": "1"
            },
            "detectionPercent": {
                "value": "11",
                "type": "SLIDER",
                "name": "  Detection Percent",
                "min": "1",
                "max": "100",
                "step": "10"
            },
            "fixedCOA": {
                "value": "250",
                "type": "NUMBER",
                "name": "  Fixed Cost of Attack ($)",
                "min": "1",
                "max": "365",
                "step": "1"
            },
            "fixedDMG": {
                "value": "1000",
                "type": "NUMBER",
                "name": "  Fixed Damage ($)",
                "min": "1",
                "max": "10000",
                "step": "1"
            },
            "detectTime": {
                "value": "3",
                "type": "NUMBER",
                "name": "  Detection Time (in days)",
                "min": "1",
                "max": "365",
                "step": "1"
            },
            "repairCost": {
                "value": "200",
                "type": "NUMBER",
                "name": "  Repair Cost ($)",
                "min": "1",
                "max": "100000",
                "step": "1"
            },
            "repairTime": {
                "value": "20",
                "type": "NUMBER",
                "name": "  Repair Time (in days)",
                "min": "1",
                "max": "100000",
                "step": "1"
            }
        },
        "cssClass": "ATTACK EVENT",
        "ports": [{
            "type": "draw2d.OutputPort",
            "id": "57b09bed-c264-70dd-2cec-f4c37fc15603",
            "width": 10,
            "height": 10,
            "alpha": 1,
            "selectable": false,
            "draggable": true,
            "angle": 0,
            "userData": {},
            "cssClass": "draw2d_OutputPort",
            "bgColor": "rgba(79,104,112,1)",
            "color": "rgba(27,27,27,1)",
            "stroke": 1,
            "dasharray": null,
            "maxFanOut": 9007199254740991,
            "name": "output0",
            "semanticGroup": "global",
            "port": "draw2d.OutputPort",
            "locator": "draw2d.layout.locator.PortLocator",
            "locatorAttr": {}
        }],
        "bgColor": "rgba(160,160,160,1)",
        "color": "rgba(27,27,27,1)",
        "stroke": 1,
        "radius": 0,
        "dasharray": null
    },
    {
        "type": "FAILURE EVENT",
        "id": "fc841c16-9220-1bec-4da7-4a94148f0699",
        "x": 720,
        "y": 480,
        "width": 100,
        "height": 50,
        "alpha": 1,
        "selectable": true,
        "draggable": true,
        "angle": 0,
        "userData": {
            "Label": " Pipeline break",
            "noOfPhases": {
                "value": "4",
                "type": "SLIDER",
                "name": "No of Phases",
                "min": "1",
                "max": "12",
                "step": "1"
            },
            "thresholdPhase": {
                "value": "2",
                "type": "SLIDER",
                "name": "Threshhold Phase",
                "min": "1",
                "max": "12",
                "step": "1"
            },
            "meanTTF": {
                "value": "90",
                "type": "NUMBER",
                "name": "Mean time to Failure (in days)",
                "min": "1",
                "max": "365",
                "step": "1"
            },
            "repairCost": {
                "value": "10000",
                "type": "NUMBER",
                "name": "Repair Cost ($)",
                "min": "1",
                "max": "10000",
                "step": "1"
            },
            "repairTime": {
                "value": "20",
                "type": "NUMBER",
                "name": "Repair Time (in days)",
                "min": "1",
                "max": "100000",
                "step": "1"
            },
            "failureProbability": {
                "value": 100,
                "type": "NUMBER",
                "name": "Failure Probability",
                "hide": true
            }
        },
        "cssClass": "FAILURE EVENT",
        "ports": [{
            "type": "draw2d.OutputPort",
            "id": "1dd133cc-3e34-2152-2386-712c2ba31125",
            "width": 10,
            "height": 10,
            "alpha": 1,
            "selectable": false,
            "draggable": true,
            "angle": 0,
            "userData": {},
            "cssClass": "draw2d_OutputPort",
            "bgColor": "rgba(79,104,112,1)",
            "color": "rgba(27,27,27,1)",
            "stroke": 1,
            "dasharray": null,
            "maxFanOut": 9007199254740991,
            "name": "output0",
            "semanticGroup": "global",
            "port": "draw2d.OutputPort",
            "locator": "draw2d.layout.locator.PortLocator",
            "locatorAttr": {}
        }],
        "bgColor": "rgba(192,43,29,1)",
        "color": "rgba(27,27,27,1)",
        "stroke": 1,
        "radius": 0,
        "dasharray": null
    },
    {
        "type": "FAILURE EVENT",
        "id": "a1c7eb39-d8ca-d810-8350-4da839de6479",
        "x": 960,
        "y": 480,
        "width": 100,
        "height": 50,
        "alpha": 1,
        "selectable": true,
        "draggable": true,
        "angle": 0,
        "userData": {
            "Label": "Protection failure",
            "noOfPhases": {
                "value": "1",
                "type": "SLIDER",
                "name": "  No of Phases",
                "min": "1",
                "max": "12",
                "step": "1"
            },
            "thresholdPhase": {
                "value": "1",
                "type": "SLIDER",
                "name": "  Threshhold Phase",
                "min": "1",
                "max": "12",
                "step": "1"
            },
            "meanTTF": {
                "value": "45",
                "type": "NUMBER",
                "name": "  Mean time to Failure (in days)",
                "min": "1",
                "max": "365",
                "step": "1"
            },
            "repairCost": {
                "value": "500",
                "type": "NUMBER",
                "name": "  Repair Cost ($)",
                "min": "1",
                "max": "10000",
                "step": "1"
            },
            "repairTime": {
                "value": "5",
                "type": "NUMBER",
                "name": "  Repair Time (in days)",
                "min": "1",
                "max": "100000",
                "step": "1"
            },
            "failureProbability": {
                "value": 100,
                "type": "NUMBER",
                "hide": true,
                "name": ""
            }
        },
        "cssClass": "FAILURE EVENT",
        "ports": [{
            "type": "draw2d.OutputPort",
            "id": "3d3ff6f0-50cc-5a87-b295-08c3bc5d2336",
            "width": 10,
            "height": 10,
            "alpha": 1,
            "selectable": false,
            "draggable": true,
            "angle": 0,
            "userData": {},
            "cssClass": "draw2d_OutputPort",
            "bgColor": "rgba(79,104,112,1)",
            "color": "rgba(27,27,27,1)",
            "stroke": 1,
            "dasharray": null,
            "maxFanOut": 9007199254740991,
            "name": "output0",
            "semanticGroup": "global",
            "port": "draw2d.OutputPort",
            "locator": "draw2d.layout.locator.PortLocator",
            "locatorAttr": {}
        }],
        "bgColor": "rgba(192,43,29,1)",
        "color": "rgba(27,27,27,1)",
        "stroke": 1,
        "radius": 0,
        "dasharray": null
    },
    {
        "type": "SAND Gate",
        "id": "fd6a779b-6766-319a-d4a4-6a77164492b6",
        "x": 860,
        "y": 280,
        "width": 60,
        "height": 80,
        "alpha": 1,
        "selectable": true,
        "draggable": true,
        "angle": 0,
        "userData": {
            "Label": "SAND Gate"
        },
        "cssClass": "SAND Gate",
        "ports": [{
                "type": "draw2d.InputPort",
                "id": "b7d589d5-82de-e7f5-2f16-07d15df9396d",
                "width": 10,
                "height": 10,
                "alpha": 1,
                "selectable": false,
                "draggable": true,
                "angle": 0,
                "userData": {},
                "cssClass": "draw2d_InputPort",
                "bgColor": "rgba(79,104,112,1)",
                "color": "rgba(27,27,27,1)",
                "stroke": 1,
                "dasharray": null,
                "maxFanOut": 9007199254740991,
                "name": "input0",
                "semanticGroup": "global",
                "port": "draw2d.InputPort",
                "locator": "draw2d.layout.locator.PortLocator",
                "locatorAttr": {}
            },
            {
                "type": "draw2d.InputPort",
                "id": "7fa95c11-ea7a-72b4-b46e-32f03343f51c",
                "width": 10,
                "height": 10,
                "alpha": 1,
                "selectable": false,
                "draggable": true,
                "angle": 0,
                "userData": {},
                "cssClass": "draw2d_InputPort",
                "bgColor": "rgba(79,104,112,1)",
                "color": "rgba(27,27,27,1)",
                "stroke": 1,
                "dasharray": null,
                "maxFanOut": 9007199254740991,
                "name": "input1",
                "semanticGroup": "global",
                "port": "draw2d.InputPort",
                "locator": "draw2d.layout.locator.PortLocator",
                "locatorAttr": {}
            },
            {
                "type": "draw2d.OutputPort",
                "id": "c2453413-8023-ab96-7ef8-303a0c639f27",
                "width": 10,
                "height": 10,
                "alpha": 1,
                "selectable": false,
                "draggable": true,
                "angle": 0,
                "userData": {},
                "cssClass": "draw2d_OutputPort",
                "bgColor": "rgba(79,104,112,1)",
                "color": "rgba(27,27,27,1)",
                "stroke": 1,
                "dasharray": null,
                "maxFanOut": 9007199254740991,
                "name": "output0",
                "semanticGroup": "global",
                "port": "draw2d.OutputPort",
                "locator": "draw2d.layout.locator.PortLocator",
                "locatorAttr": {}
            }
        ],
        "bgColor": "rgba(0,0,0,0)",
        "color": "rgba(27,27,27,1)",
        "stroke": 0,
        "radius": 0,
        "dasharray": null
    },
    {
        "type": "SAND Gate",
        "id": "10ca8d7a-4891-ff7e-b751-dd7c6fff33ae",
        "x": 380,
        "y": 310,
        "width": 70,
        "height": 70,
        "alpha": 1,
        "selectable": true,
        "draggable": true,
        "angle": 0,
        "userData": {
            "Label": "SAND Gate"
        },
        "cssClass": "SAND Gate",
        "ports": [{
                "type": "draw2d.InputPort",
                "id": "f5f7c1b5-b80c-a7cc-833b-109bcc14a104",
                "width": 10,
                "height": 10,
                "alpha": 1,
                "selectable": false,
                "draggable": true,
                "angle": 0,
                "userData": {},
                "cssClass": "draw2d_InputPort",
                "bgColor": "rgba(79,104,112,1)",
                "color": "rgba(27,27,27,1)",
                "stroke": 1,
                "dasharray": null,
                "maxFanOut": 9007199254740991,
                "name": "input0",
                "semanticGroup": "global",
                "port": "draw2d.InputPort",
                "locator": "draw2d.layout.locator.PortLocator",
                "locatorAttr": {}
            },
            {
                "type": "draw2d.InputPort",
                "id": "c17dd260-28bb-202f-387b-3b9c09342024",
                "width": 10,
                "height": 10,
                "alpha": 1,
                "selectable": false,
                "draggable": true,
                "angle": 0,
                "userData": {},
                "cssClass": "draw2d_InputPort",
                "bgColor": "rgba(79,104,112,1)",
                "color": "rgba(27,27,27,1)",
                "stroke": 1,
                "dasharray": null,
                "maxFanOut": 9007199254740991,
                "name": "input1",
                "semanticGroup": "global",
                "port": "draw2d.InputPort",
                "locator": "draw2d.layout.locator.PortLocator",
                "locatorAttr": {}
            },
            {
                "type": "draw2d.OutputPort",
                "id": "92e455f7-e4e7-2950-82f7-3f5f6547d5ac",
                "width": 10,
                "height": 10,
                "alpha": 1,
                "selectable": false,
                "draggable": true,
                "angle": 0,
                "userData": {},
                "cssClass": "draw2d_OutputPort",
                "bgColor": "rgba(79,104,112,1)",
                "color": "rgba(27,27,27,1)",
                "stroke": 1,
                "dasharray": null,
                "maxFanOut": 9007199254740991,
                "name": "output0",
                "semanticGroup": "global",
                "port": "draw2d.OutputPort",
                "locator": "draw2d.layout.locator.PortLocator",
                "locatorAttr": {}
            }
        ],
        "bgColor": "rgba(0,0,0,0)",
        "color": "rgba(27,27,27,1)",
        "stroke": 0,
        "radius": 0,
        "dasharray": null
    },
    {
        "type": "draw2d.Connection",
        "id": "39d0809c-0c43-1de5-75b3-4f8e8d6d4fd0",
        "alpha": 1,
        "selectable": true,
        "draggable": true,
        "angle": 0,
        "userData": {},
        "cssClass": "draw2d_Connection",
        "stroke": 2,
        "color": "rgba(18,156,228,1)",
        "outlineStroke": 0,
        "outlineColor": "rgba(0,0,0,0)",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [{
                "x": 655,
                "y": 160
            },
            {
                "x": 655,
                "y": 135
            },
            {
                "x": 650,
                "y": 135
            },
            {
                "x": 650,
                "y": 110
            }
        ],
        "router": "draw2d.layout.connection.CircuitConnectionRouter",
        "radius": 3,
        "source": {
            "node": "1b99d7cb-7bc2-2791-549e-e88b35958f7c",
            "port": "output0"
        },
        "target": {
            "node": "bda07307-d321-7209-4799-a280b9714b61",
            "port": "input0"
        }
    },
    {
        "type": "draw2d.Connection",
        "id": "8801c65a-913d-116a-f7f1-ee53231d51f5",
        "alpha": 1,
        "selectable": true,
        "draggable": true,
        "angle": 0,
        "userData": {},
        "cssClass": "draw2d_Connection",
        "stroke": 2,
        "color": "rgba(18,156,228,1)",
        "outlineStroke": 0,
        "outlineColor": "rgba(0,0,0,0)",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [{
                "x": 890,
                "y": 280
            },
            {
                "x": 890,
                "y": 230
            },
            {
                "x": 690,
                "y": 230
            }
        ],
        "router": "draw2d.layout.connection.CircuitConnectionRouter",
        "radius": 3,
        "source": {
            "node": "fd6a779b-6766-319a-d4a4-6a77164492b6",
            "port": "output0"
        },
        "target": {
            "node": "1b99d7cb-7bc2-2791-549e-e88b35958f7c",
            "port": "input1"
        }
    },
    {
        "type": "draw2d.Connection",
        "id": "9bd325fb-a5db-2b64-8df8-62dd7ca24a70",
        "alpha": 1,
        "selectable": true,
        "draggable": true,
        "angle": 0,
        "userData": {},
        "cssClass": "draw2d_Connection",
        "stroke": 2,
        "color": "rgba(18,156,228,1)",
        "outlineStroke": 0,
        "outlineColor": "rgba(0,0,0,0)",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [{
                "x": 415,
                "y": 310
            },
            {
                "x": 415,
                "y": 230
            },
            {
                "x": 620,
                "y": 230
            }
        ],
        "router": "draw2d.layout.connection.CircuitConnectionRouter",
        "radius": 3,
        "source": {
            "node": "10ca8d7a-4891-ff7e-b751-dd7c6fff33ae",
            "port": "output0"
        },
        "target": {
            "node": "1b99d7cb-7bc2-2791-549e-e88b35958f7c",
            "port": "input0"
        }
    },
    {
        "type": "draw2d.Connection",
        "id": "7197b700-8ce8-4d7d-15bb-465e240b11f5",
        "alpha": 1,
        "selectable": true,
        "draggable": true,
        "angle": 0,
        "userData": {},
        "cssClass": "draw2d_Connection",
        "stroke": 2,
        "color": "rgba(18,156,228,1)",
        "outlineStroke": 0,
        "outlineColor": "rgba(0,0,0,0)",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [{
                "x": 290,
                "y": 480
            },
            {
                "x": 290,
                "y": 380
            },
            {
                "x": 380,
                "y": 380
            }
        ],
        "router": "draw2d.layout.connection.CircuitConnectionRouter",
        "radius": 3,
        "source": {
            "node": "dfbc58d1-75d3-333f-3d77-52bf930337e8",
            "port": "output0"
        },
        "target": {
            "node": "10ca8d7a-4891-ff7e-b751-dd7c6fff33ae",
            "port": "input0"
        }
    },
    {
        "type": "draw2d.Connection",
        "id": "3aff0990-fc25-5a29-7e6d-6c98775a2a8f",
        "alpha": 1,
        "selectable": true,
        "draggable": true,
        "angle": 0,
        "userData": {},
        "cssClass": "draw2d_Connection",
        "stroke": 2,
        "color": "rgba(18,156,228,1)",
        "outlineStroke": 0,
        "outlineColor": "rgba(0,0,0,0)",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [{
                "x": 770,
                "y": 480
            },
            {
                "x": 770,
                "y": 360
            },
            {
                "x": 860,
                "y": 360
            }
        ],
        "router": "draw2d.layout.connection.CircuitConnectionRouter",
        "radius": 3,
        "source": {
            "node": "fc841c16-9220-1bec-4da7-4a94148f0699",
            "port": "output0"
        },
        "target": {
            "node": "fd6a779b-6766-319a-d4a4-6a77164492b6",
            "port": "input0"
        }
    },
    {
        "type": "draw2d.Connection",
        "id": "aada3d01-86b7-86f0-7052-72a4b5665814",
        "alpha": 1,
        "selectable": true,
        "draggable": true,
        "angle": 0,
        "userData": {},
        "cssClass": "draw2d_Connection",
        "stroke": 2,
        "color": "rgba(18,156,228,1)",
        "outlineStroke": 0,
        "outlineColor": "rgba(0,0,0,0)",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [{
                "x": 1010,
                "y": 480
            },
            {
                "x": 1010,
                "y": 360
            },
            {
                "x": 920,
                "y": 360
            }
        ],
        "router": "draw2d.layout.connection.CircuitConnectionRouter",
        "radius": 3,
        "source": {
            "node": "a1c7eb39-d8ca-d810-8350-4da839de6479",
            "port": "output0"
        },
        "target": {
            "node": "fd6a779b-6766-319a-d4a4-6a77164492b6",
            "port": "input1"
        }
    },
    {
        "type": "draw2d.Connection",
        "id": "a1503bdb-543c-23d8-a1e0-97dcffa3fa89",
        "alpha": 1,
        "selectable": true,
        "draggable": true,
        "angle": 0,
        "userData": {},
        "cssClass": "draw2d_Connection",
        "stroke": 2,
        "color": "rgba(18,156,228,1)",
        "outlineStroke": 0,
        "outlineColor": "rgba(0,0,0,0)",
        "policy": "draw2d.policy.line.LineSelectionFeedbackPolicy",
        "vertex": [{
                "x": 530,
                "y": 480
            },
            {
                "x": 530,
                "y": 380
            },
            {
                "x": 450,
                "y": 380
            }
        ],
        "router": "draw2d.layout.connection.CircuitConnectionRouter",
        "radius": 3,
        "source": {
            "node": "9c761841-0afe-c223-2b8b-086323b41ba1",
            "port": "output0"
        },
        "target": {
            "node": "10ca8d7a-4891-ff7e-b751-dd7c6fff33ae",
            "port": "input1"
        }
    }
]

var parser = function(object, canvas, draw2d) {
    canvas.clear();
    let elementMap = {}
    let connections = []
    let nodes = {}
    object.forEach(element => {
        if (element.type != "draw2d.Connection") {
            if (element.type == 'ATTACK EVENT') {
                canvas.add(f2 = new ATTACKEVENT({
                    x: element.x,
                    y: element.y,
                    Label: element.userData.Label,
                    enable: {
                        value: element.userData.enable.value,
                        type: 'BOOL',
                        name: 'enable',
                        hide: true,
                    },
                    detection: {
                        value: element.userData.detection.value,
                        type: 'BOOL',
                        name: 'Detection',
                        hide: true,
                    },
                    meanTTA: {
                        value: element.userData.meanTTA.value,
                        type: 'SLIDER',
                        name: 'Mean Time to Attack (in days)',
                        min: element.userData.meanTTA.min,
                        max: element.userData.meanTTA.max,
                        step: element.userData.meanTTA.step
                    },
                    detectionPercent: {
                        value: element.userData.detectionPercent.value,
                        type: 'SLIDER',
                        name: 'Detection Percent',
                        min: element.userData.detectionPercent.min,
                        max: element.userData.detectionPercent.max,
                        step: element.userData.detectionPercent.step
                    },
                    fixedCOA: {
                        value: element.userData.fixedCOA.value,
                        type: 'NUMBER',
                        name: 'Fixed Cost of Attack ($)',
                        min: element.userData.fixedCOA.min,
                        max: element.userData.fixedCOA.max,
                        step: element.userData.fixedCOA.step
                    },
                    fixedDMG: {
                        value: element.userData.fixedDMG.value,
                        type: 'NUMBER',
                        name: 'Fixed Damage ($)',
                        min: element.userData.fixedDMG.min,
                        max: element.userData.fixedDMG.max,
                        step: element.userData.fixedDMG.step
                    },
                    detectTime: {
                        value: element.userData.detectTime.value,
                        type: 'NUMBER',
                        name: 'Detection Time (in days)',
                        min: element.userData.detectTime.min,
                        max: element.userData.detectTime.max,
                        step: element.userData.detectTime.step
                    },
                    repairCost: {
                        value: element.userData.repairCost.value,
                        type: 'NUMBER',
                        name: 'Repair Cost ($)',
                        min: element.userData.repairCost.min,
                        max: element.userData.repairCost.max,
                        step: element.userData.repairCost.step
                    },
                    repairTime: {
                        value: element.userData.repairTime.value,
                        type: 'NUMBER',
                        name: 'Repair Time (in days)',
                        min: element.userData.repairTime.min,
                        max: element.userData.repairTime.max,
                        step: element.userData.repairTime.step
                    }

                }));
                nodes[f2.id] = f2
                elementMap[element.id] = f2.id;
            }

            if (element.type == 'FAILURE EVENT') {
                canvas.add(f2 = new FAILUREEVENT({
                    x: element.x,
                    y: element.y,
                    Label: element.userData.Label,
                    noOfPhases: {
                        value: element.userData.noOfPhases.value,
                        type: 'SLIDER',
                        name: 'No of Phases',
                        min: element.userData.noOfPhases.min,
                        max: element.userData.noOfPhases.max,
                        step: element.userData.noOfPhases.step
                    },
                    thresholdPhase: {
                        value: element.userData.thresholdPhase.value,
                        type: 'SLIDER',
                        name: 'Threshhold Phase',
                        min: element.userData.thresholdPhase.min,
                        max: element.userData.thresholdPhase.max,
                        step: element.userData.thresholdPhase.step
                    },
                    meanTTF: {
                        value: element.userData.meanTTF.value,
                        type: 'NUMBER',
                        name: 'Mean time to Failure (in days)',
                        min: element.userData.meanTTF.min,
                        max: element.userData.meanTTF.max,
                        step: element.userData.meanTTF.step
                    },
                    repairCost: {
                        value: element.userData.repairCost.value,
                        type: 'NUMBER',
                        name: 'Repair Cost ($)',
                        min: element.userData.repairCost.min,
                        max: element.userData.repairCost.max,
                        step: element.userData.repairCost.step
                    },
                    repairTime: {
                        value: element.userData.repairTime.value,
                        type: 'NUMBER',
                        name: 'Repair Time (in days)',
                        min: element.userData.repairTime.min,
                        max: element.userData.repairTime.max,
                        step: element.userData.repairTime.step
                    },
                    failureProbability: {
                        value: element.userData.failureProbability.value,
                        type: 'NUMBER',
                        name: 'Failure Probability',
                        min: element.userData.failureProbability.min,
                        max: element.userData.failureProbability.max,
                        step: element.userData.failureProbability.step,
                        hide: true,
                    }

                }));

                nodes[f2.id] = f2
                elementMap[element.id] = f2.id;

            }

            if (element.type == 'TOP EVENT') {
                canvas.add(f2 = new TOPEVENT({
                    x: element.x,
                    y: element.y,
                    Label: element.userData.Label,
                    inspFreq: {
                        value: element.userData.inspFreq.value,
                        type: 'NUMBER',
                        name: 'Inspection Frequency',
                        min: element.userData.inspFreq.min,
                        max: element.userData.inspFreq.max,
                        step: element.userData.inspFreq.step
                    }

                }));
                nodes[f2.id] = f2
                elementMap[element.id] = f2.id;

            }

            if (element.type == 'OR Gate') {
                canvas.add(f2 = new OR({
                    x: element.x,
                    y: element.y,
                    A: Math.floor(Math.random() * 10),
                    B: Math.floor(Math.random() * 10)

                }));
                nodes[f2.id] = f2
                elementMap[element.id] = f2.id;

            }

            if (element.type == 'AND Gate') {
                canvas.add(f2 = new AND({
                    x: element.x,
                    y: element.y,
                    A: Math.floor(Math.random() * 10),
                    B: Math.floor(Math.random() * 10)

                }));
                nodes[f2.id] = f2
                elementMap[element.id] = f2.id;

            }

            if (element.type == 'SAND Gate') {
                canvas.add(f2 = new SAND({
                    x: element.x,
                    y: element.y,
                    A: Math.floor(Math.random() * 10),
                    B: Math.floor(Math.random() * 10)

                }));
                nodes[f2.id] = f2
                elementMap[element.id] = f2.id;

            }


        }

        if (element.type == "draw2d.Connection") {
            connections.push({ "source": element.source, "target": element.target })
        }

    });

    object.forEach(element => {
        if (element.type == "draw2d.Connection") {

        }
    });

    connections.forEach(element => {
        var c = new draw2d.Connection({
            source: nodes[elementMap[element.source.node]].getPort(element.source.port),
            target: nodes[elementMap[element.target.node]].getPort(element.target.port)
        });
        c.setRouter(new draw2d.layout.connection.CircuitConnectionRouter());
        canvas.add(c);
        displayJSON(canvas);
    });
}