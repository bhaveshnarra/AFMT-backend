var rangeSlider = function() {
    var slider = $('.range-slider'),
        range = $('.range-slider__range'),
        value = $('.range-slider__value');


    var $controls = $('.control');

    $controls.on('click', function() {
        var $this = $(this),
            $container = $this.closest('.input-container'),
            $currentInput = $container.find('input'),
            currentValue = parseInt($currentInput.val()),
            step = parseInt($currentInput.attr("step")),
            max = parseInt($currentInput.attr("max")),
            value = currentValue,
            minValue = parseInt($currentInput.attr('min'));
        if ($this.hasClass('increase') && (currentValue - step) <= max) {
            value = currentValue + step;
        }
        if ($this.hasClass('decrease') && (currentValue - step) >= minValue) {
            value = currentValue - step;
        }
        $currentInput.val(value);
        $currentInput.click();
    });

    slider.each(function() {

        value.each(function() {
            var value = $(this).prev().attr('value');
            $(this).html(value);
            // console.log('value: ' + $(this).html(value));
        });

        range.on('input', function() {
            $(this).next(value).html(this.value);
            // console.log('input: ' + $(this).next(value).html(this.value));
        });
    });
};