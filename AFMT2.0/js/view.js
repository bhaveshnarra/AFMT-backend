View = draw2d.Canvas.extend({

    init: function(id) {
        this._super(id, 2000, 2000);

        this.setScrollArea("#" + id);
    },


    /**
     * @method
     * Called if the user drop the droppedDomNode onto the canvas.<br>
     * <br>
     * Draw2D use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     * 
     * @param {HTMLElement} droppedDomNode The dropped DOM element.
     * @param {Number} x the x coordinate of the drop
     * @param {Number} y the y coordinate of the drop
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    onDrop: function(droppedDomNode, x, y, shiftKey, ctrlKey) {
        // console.log(droppedDomNode, x, y);
        var type = $(droppedDomNode).data("shape");
        if (type == 'OR') {
            canvas.add(f2 = new OR({
                x: Math.round(x / 10) * 10,
                y: Math.round(y / 10) * 10,
                A: Math.floor(Math.random() * 10),
                B: Math.floor(Math.random() * 10)

            }));

        }

        if (type == 'AND') {
            canvas.add(f2 = new AND({
                x: Math.round(x / 10) * 10,
                y: Math.round(y / 10) * 10,
                A: Math.floor(Math.random() * 10),
                B: Math.floor(Math.random() * 10)

            }));

        }

        if (type == 'SAND') {
            canvas.add(f2 = new SAND({
                x: Math.round(x / 10) * 10,
                y: Math.round(y / 10) * 10,
                A: Math.floor(Math.random() * 10),
                B: Math.floor(Math.random() * 10)

            }));
        }



        if (type == 'FAI') {
            canvas.add(f2 = new FAILUREEVENT({
                x: Math.round(x / 10) * 10,
                y: Math.round(y / 10) * 10,
                Label: "Failure Event",
                noOfPhases: {
                    value: 1,
                    type: 'SLIDER',
                    name: 'No of Phases',
                    min: 1,
                    max: 12,
                    step: 1
                },
                thresholdPhase: {
                    value: 1,
                    type: 'SLIDER',
                    name: 'Threshhold Phase',
                    min: 1,
                    max: 12,
                    step: 1
                },
                meanTTF: {
                    value: 1,
                    type: 'NUMBER',
                    name: 'Mean time to Failure (in days)',
                    min: 1,
                    max: 365,
                    step: 1
                },
                repairCost: {
                    value: 1,
                    type: 'NUMBER',
                    name: 'Repair Cost ($)',
                    min: 1,
                    max: 10000,
                    step: 1
                },
                repairTime: {
                    value: 1,
                    type: 'NUMBER',
                    name: 'Repair Time (in days)',
                    min: 1,
                    max: 100000,
                    step: 1
                },
                failureProbability: {
                    value: 100,
                    type: 'NUMBER',
                    name: 'Failure Probability',
                    min: 1,
                    max: 100,
                    step: 1,
                    hide: true,
                }

            }));

        }

        if (type == 'TOP') {
            canvas.add(f2 = new TOPEVENT({
                x: Math.round(x / 10) * 10,
                y: Math.round(y / 10) * 10,
                Label: "Top Event",
                inspFreq: {
                    value: 1,
                    type: 'NUMBER',
                    name: 'Inspection Frequency',
                    min: 1,
                    max: 10000,
                    step: 1
                }

            }));
        }
        if (type == 'ATK') {

            canvas.add(f2 = new ATTACKEVENT({
                x: Math.round(x / 10) * 10,
                y: Math.round(y / 10) * 10,
                Label: "Attack Event",
                enable: {
                    value: true,
                    type: 'BOOL',
                    name: 'enable',
                    hide: true,
                },
                detection: {
                    value: true,
                    type: 'BOOL',
                    name: 'Detection',
                    hide: true,
                },
                meanTTA: {
                    value: 1,
                    type: 'SLIDER',
                    name: 'Mean Time to Attack (in days)',
                    min: 1,
                    max: 365,
                    step: 1
                },
                detectionPercent: {
                    value: 1,
                    type: 'SLIDER',
                    name: 'Detection Percent',
                    min: 1,
                    max: 100,
                    step: 10
                },
                fixedCOA: {
                    value: 1,
                    type: 'NUMBER',
                    name: 'Fixed Cost of Attack ($)',
                    min: 1,
                    max: 365,
                    step: 1
                },
                fixedDMG: {
                    value: 1,
                    type: 'NUMBER',
                    name: 'Fixed Damage ($)',
                    min: 1,
                    max: 10000,
                    step: 1
                },
                detectTime: {
                    value: 1,
                    type: 'NUMBER',
                    name: 'Detection Time (in days)',
                    min: 1,
                    max: 365,
                    step: 1
                },
                repairCost: {
                    value: 1,
                    type: 'NUMBER',
                    name: 'Repair Cost ($)',
                    min: 1,
                    max: 100000,
                    step: 1
                },
                repairTime: {
                    value: 1,
                    type: 'NUMBER',
                    name: 'Repair Time (in days)',
                    min: 1,
                    max: 100000,
                    step: 1
                }

            }));
        }
        // eval("new " + type + "();");

        // figure.addEntity("id");
        // figure.setName("NewTable");

        // create a command for the undo/redo support
        // var command = new draw2d.command.CommandAdd(this, figure, x, y);
        // this.getCommandStack().execute(command);
        displayJSON(canvas);
    }
});