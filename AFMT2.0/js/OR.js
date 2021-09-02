var OR = draw2d.SVGFigure.extend({
    NAME: "OR Gate",
    init: function(attr, setter, getter) {
        this.svg1 = '  <svg width="70px" height="70px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" > <path id="lineAB" d="M 0 100 Q 10 50 50 0" stroke="black" stroke-width="5" fill="none" /> <path id="lineBC" d="M 50 0 Q 90 50 100 100" stroke="black" stroke-width="5" fill="none" /> <path d="M 0 100 Q 50 50 100 100" stroke="black" stroke-width="5" fill="none" /> <g stroke="black" stroke-width="3" fill="black"> <circle id="pointA" cx="0" cy="100" r="1" /> <circle id="pointB" cx="50" cy="0" r="1" /> <circle id="pointC" cx="100" cy="100" r="1" /> </g> </svg>';
        // this._super(
        //     $.extend({
        //         width: 100,
        //         height: 100,
        //         x: 100,
        //         y: 100
        //     }, attr),
        //     setter,
        //     getter);
        this._super($.extend({ svg: this.svg1, width: 70, height: 70 }, attr), getter, setter);
        this.installEditPolicy(new SelectionMenuPolicy());

        var MyInputPortLocator = draw2d.layout.locator.PortLocator.extend({
            init: function() {
                this._super();
            },
            relocate: function(index, figure) {
                this.applyConsiderRotation(figure, 0, figure.getParent().getHeight());
            }
        });

        var MyInputPortLocator2 = draw2d.layout.locator.PortLocator.extend({
            init: function() {
                this._super();
            },
            relocate: function(index, figure) {
                this.applyConsiderRotation(figure, figure.getParent().getWidth(), figure.getParent().getHeight());
            }
        });


        this.userData = {};
        this.userData["Label"] = "OR Gate"
        var MyOutputPortLocator = draw2d.layout.locator.PortLocator.extend({
            init: function() {
                this._super();
            },
            relocate: function(index, figure) {
                var p = figure.getParent();

                this.applyConsiderRotation(figure, p.getWidth() / 2, 0);
            }
        });


        this.createPort("input", new MyInputPortLocator());
        this.createPort("input", new MyInputPortLocator2());
        this.createPort("output", new MyOutputPortLocator());

        this.classLabel = new draw2d.shape.basic.Label({
            text: "OR Label",
            stroke: 1,
            fontColor: "#5856d6",
            bgColor: "#f7f7f7",
            radius: this.getRadius(),
            padding: 10,
            resizeable: true,
            editor: new draw2d.ui.LabelInplaceEditor({
                onCommit: $.proxy(function(value) {
                    this.userData["Label"] = value;
                }, this),
            })
        });

        this.add(this.classLabel, new draw2d.layout.locator.RightLocator());
    },

    /**
     * @method
     * Returns the Command to perform the specified Request or null.
     *
     * @param {draw2d.command.CommandType} request describes the Command being requested
     * @return {draw2d.command.Command} null or a Command
     * @private
     **/
    createCommand: function(request) {
        // this node didn't support rotation on doubleClick
        if (request.getPolicy() === draw2d.command.CommandType.ROTATE) {
            return null;
        }


        return this._super(request);
    },

    getProperties: function() {
        return this.userData;
    },

    setProperties: function(attr) {
        this.userData = {
            A: attr.A,
            B: attr.B,
            C: attr.C
        }
        console.log(this.userData);
    }


});