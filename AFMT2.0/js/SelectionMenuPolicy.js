var SelectionMenuPolicy = draw2d.policy.figure.SelectionPolicy.extend({
    NAME: "SelectionMenuPolicy",

    init: function(attr, setter, getter) {
        this.overlay = null; // div DOM node

        this._super(attr, setter, getter);
    },

    /**
     * @method
     *
     * @template
     * @param {draw2d.Canvas} canvas the related canvas
     * @param {draw2d.Figure} figure the selected figure
     * @param {boolean} isPrimarySelection
     */
    onSelect: function(canvas, figure, isPrimarySelection) {
        this._super(canvas, figure, isPrimarySelection);
        openPropNav()

    },


    /**
     * @method
     *
     * @param {draw2d.Canvas} canvas the related canvas
     * @param {draw2d.Figure} figure the unselected figure
     */
    onUnselect: function(canvas, figure) {
        this._super(canvas, figure);
        $("#propertybar").empty();
        closePropNav()
    },


    onDrag: function(canvas, figure) {
        this._super(canvas, figure);

    },


});