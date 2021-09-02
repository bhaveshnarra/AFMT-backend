PropertyPane = Class.extend({

    init: function(elementId, view) {
        this.html = $("#propertybar");
        this.view = view;

        // Databinding: helper attributes for the databinding
        this.selectedFigure = null;
        this.updateCallback = null;

        view.on("select", $.proxy(this.onSelectionChanged, this));
        console.log("hello");
    },

    /**
     * @method
     * Called if the selection in the canvas has been changed. You must register this
     * on the canvas to receive this event.
     *
     * @param {draw2d.Canvas} emitter
     * @param {Object} event
     * @param {draw2d.Figure} event.figure
     */
    onSelectionChanged: function(emitter, event) {
        // Databinding: deregister the old update listener
        if (this.selectedFigure !== null && this.updateCallback !== null) {
            this.selectedFigure.off(this.updateCallback);
        }

        this.selectedFigure = event.figure;

        this.html.html("");
        if (event.figure instanceof draw2d.shape.node.Node) {
            this.showPropertiesOpAmp(event.figure);
        }
    },


    /**
     * @method
     * Called if the selection in the canvas has been changed. You must register this
     * on the canvas to receive this event.
     * 
     * @param {draw2d.Figure} figure
     */
    showPropertiesOpAmp: function(figure) {
        // Set some good defaults
        // (better you create  new class and set the defaults in the init method)
        var userData = figure.getProperties();
        if (userData === null) {
            $("#propertybar").html("<h1>No Properties</h1>");
        } else {
            let html = "";
            for (x in userData) {
                console.log();
                if (userData[x]) {
                    if (userData[x]['hide']) {

                    } else {
                        if (userData[x]['type'] == 'NUMBER') {
                            html += '<h4 style="margin-left:10px;font-size:1rem;margin-bottom:0" id="title' + x + '" > ' + userData[x]['name'] + '</h4><div class="input-container"><input type="number" id="property' + x + '" value="' + userData[x]['value'] + '" min="' + userData[x]['min'] + '" max="' + userData[x]['max'] + '" step="' + userData[x]['step'] + '"> <span class="control increase"></span> <span class="control decrease"></span> </div>'
                        }

                        if (userData[x]['type'] == 'SLIDER') {
                            html += '<h4 style="margin-left:10px;font-size:1rem;margin-bottom:0" id="title' + x + '" > ' + userData[x]['name'] + '</h4><div class="range-slider"><input id="property' + x + '" class="range-slider__range" type="range" step=' + userData[x]['step'] + ' value="' + userData[x]['value'] + '" min="' + userData[x]['min'] + '" max="' + userData[x]['max'] + '"><span class="range-slider__value">' + userData[x]['value'] + '</span></div>'

                        }

                        if (userData[x]['type'] == 'BOOL') {
                            if (userData[x]['value']) {
                                html += '<h4 style="margin-left:10px;font-size:1rem;margin-bottom:0" id="title' + x + '" > ' + userData[x]['name'] + '</h4><label class="switch"><input checked id="property' + x + '"  type="checkbox"><span class="slider"></span></label>'

                            } else {
                                html += '<h4 style="margin-left:10px;font-size:1rem;margin-bottom:0" id="title' + x + '" > ' + userData[x]['name'] + '</h4><label class="switch"><input id="property' + x + '"  type="checkbox"><span class="slider"></span></label>'

                            }

                        }
                    }
                    // html += ''

                }



            }
            $("#propertybar").html(html);
        }

        rangeSlider();

        var isInUpdate = false;
        figure.on("move", function() {
            if (isInUpdate) return;
            isInUpdate = true; // avoid recursion
            $("#property_position_x").val(figure.getPosition().x);
            $("#property_position_y").val(figure.getPosition().y);
            isInUpdate = false;
        });

        // Databinding: UI --> Figure
        //
        $("#propertybar input").on("change click input", function() {
            if (figure['cssClass'] === 'FAILURE EVENT') {
                let attr = {

                        noOfPhases: {
                            value: $("#propertynoOfPhases").val(),
                            type: 'SLIDER',
                            name: $("#titlenoOfPhases").text(),
                            min: $("#propertynoOfPhases").attr("min"),
                            max: $("#propertynoOfPhases").attr("max"),
                            step: $("#propertynoOfPhases").attr("step")
                        },
                        thresholdPhase: {
                            value: $("#propertythresholdPhase").val(),
                            type: 'SLIDER',
                            name: $("#titlethresholdPhase").text(),
                            min: $("#propertythresholdPhase").attr("min"),
                            max: $("#propertythresholdPhase").attr("max"),
                            step: $("#propertythresholdPhase").attr("step")
                        },
                        meanTTF: {
                            value: $("#propertymeanTTF").val(),
                            type: 'NUMBER',
                            name: $("#titlemeanTTF").text(),
                            min: $("#propertymeanTTF").attr('min'),
                            max: $("#propertymeanTTF").attr('max'),
                            step: $("#propertymeanTTF").attr('step')
                        },
                        repairCost: {
                            value: $("#propertyrepairCost").val(),
                            type: 'NUMBER',
                            name: $("#titlerepairCost").text(),
                            min: $("#propertyrepairCost").attr('min'),
                            max: $("#propertyrepairCost").attr('max'),
                            step: $("#propertyrepairCost").attr('step')
                        },
                        repairTime: {
                            value: $("#propertyrepairTime").val(),
                            type: 'NUMBER',
                            name: $("#titlerepairTime").text(),
                            min: $("#propertyrepairTime").attr('min'),
                            max: $("#propertyrepairTime").attr('max'),
                            step: $("#propertyrepairTime").attr('step')
                        },
                        failureProbability: {
                            value: 100,
                            type: 'NUMBER',
                            hide: true,
                            name: $("#titlefailureProbability").text(),
                            min: $("#propertyfailureProbability").attr('min'),
                            max: $("#propertyfailureProbability").attr('max'),
                            step: $("#propertyfailureProbability").attr('step')
                        }
                    }
                    // console.log($("#propertymeanTTF").val(), $("#propertymeanTTF").attr("value"), $("#propertynoOfPhases").attr("min"), $("#propertynoOfPhases").attr("step"));

                figure.setProperties(attr);
            }

            if (figure['cssClass'] === 'TOP EVENT') {
                let attr = {

                        inspFreq: {
                            value: $("#propertyinspFreq").val(),
                            type: 'NUMBER',
                            name: $("#titleinspFreq").text(),
                            min: $("#propertyinspFreq").attr('min'),
                            max: $("#propertyinspFreq").attr('max'),
                            step: $("#propertyinspFreq").attr('step')
                        },
                    }
                    // console.log($("#propertymeanTTF").val(), $("#propertymeanTTF").attr("value"), $("#propertynoOfPhases").attr("min"), $("#propertynoOfPhases").attr("step"));

                figure.setProperties(attr);
            }

            if (figure['cssClass'] === 'ATTACK EVENT') {
                let attr = {
                        meanTTA: {
                            value: $("#propertymeanTTA").val(),
                            type: 'SLIDER',
                            name: $("#titlemeanTTA").text(),
                            min: $("#propertymeanTTA").attr("min"),
                            max: $("#propertymeanTTA").attr("max"),
                            step: $("#propertymeanTTA").attr("step")
                        },
                        detectionPercent: {
                            value: $("#propertydetectionPercent").val(),
                            type: 'SLIDER',
                            name: $("#titledetectionPercent").text(),
                            min: $("#propertydetectionPercent").attr("min"),
                            max: $("#propertydetectionPercent").attr("max"),
                            step: $("#propertydetectionPercent").attr("step")
                        },
                        fixedCOA: {
                            value: $("#propertyfixedCOA").val(),
                            type: 'NUMBER',
                            name: $("#titlefixedCOA").text(),
                            min: $("#propertyfixedCOA").attr('min'),
                            max: $("#propertyfixedCOA").attr('max'),
                            step: $("#propertyfixedCOA").attr('step')
                        },
                        fixedDMG: {
                            value: $("#propertyfixedDMG").val(),
                            type: 'NUMBER',
                            name: $("#titlefixedDMG").text(),
                            min: $("#propertyfixedDMG").attr('min'),
                            max: $("#propertyfixedDMG").attr('max'),
                            step: $("#propertyfixedDMG").attr('step')
                        },
                        detection: {
                            value: true,
                            type: 'BOOL',
                            hide: true,
                            name: $("#titledetection").text()
                        },
                        enable: {
                            value: true,
                            type: 'BOOL',
                            hide: true,
                            name: $("#titleenable").text()
                        },
                        detectTime: {
                            value: $("#propertydetectTime").val(),
                            type: 'NUMBER',
                            name: $("#titledetectTime").text(),
                            min: $("#propertydetectTime").attr('min'),
                            max: $("#propertydetectTime").attr('max'),
                            step: $("#propertydetectTime").attr('step')
                        },
                        repairCost: {
                            value: $("#propertyrepairCost").val(),
                            type: 'NUMBER',
                            name: $("#titlerepairCost").text(),
                            min: $("#propertyrepairCost").attr('min'),
                            max: $("#propertyrepairCost").attr('max'),
                            step: $("#propertyrepairCost").attr('step')
                        },
                        repairTime: {
                            value: $("#propertyrepairTime").val(),
                            type: 'NUMBER',
                            name: $("#titlerepairTime").text(),
                            min: $("#propertyrepairTime").attr('min'),
                            max: $("#propertyrepairTime").attr('max'),
                            step: $("#propertyrepairTime").attr('step')
                        }
                    }
                    // console.log($("#propertyenable").is(':checked'));
                    // console.log($("#propertymeanTTF").val(), $("#propertymeanTTF").attr("value"), $("#propertynoOfPhases").attr("min"), $("#propertynoOfPhases").attr("step"));
                figure.setProperties(attr);
            }
            displayJSON(canvas);
        });


    }
});