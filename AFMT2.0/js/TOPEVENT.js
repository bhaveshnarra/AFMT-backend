var TOPEVENT = draw2d.shape.basic.Diamond.extend({
    NAME: "TOP EVENT",
    init: function(attr, setter, getter) {
        this._super(
            $.extend({
                width: 100,
                height: 50,
                x: 100,
                y: 100
            }, attr),
            setter,
            getter);
        this.installEditPolicy(new SelectionMenuPolicy());

        var MyInputPortLocator = draw2d.layout.locator.PortLocator.extend({
            init: function() {
                this._super();
            },
            relocate: function(index, figure) {
                this.applyConsiderRotation(figure, figure.getParent().getWidth() / 2, figure.getParent().getHeight());
            }
        });
        this.Label = attr.Label
        this.createPort("input", new MyInputPortLocator());
        this.userData = {
            Label: this.Label,
            inspFreq: attr.inspFreq
        }
        this.classLabel = new draw2d.shape.basic.Label({
            text: this.Label,
            stroke: 1,
            fontColor: "#5856d6",
            bgColor: "#f7f7f7",
            radius: this.getRadius(),
            padding: 10,
            resizeable: true,
            editor: new draw2d.ui.LabelInplaceEditor({
                onCommit: $.proxy(function(value) {
                    this.Label = value;
                    this.userData["Label"] = this.Label
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
            Label: this.Label,
            inspFreq: attr.inspFreq
        }
        console.log(this.userData);
    }


});