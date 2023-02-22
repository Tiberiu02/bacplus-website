/**
 * This data rendering helper method will convert percentage values into a bar.
 * Values can either have the % sign or not and decimals get rounded to the
 * given value. The percentage will have a max value of 100%.
 *
 * This function should be used with the `dt-init columns.render` configuration
 * option of DataTables.
 *
 * v1.1 Changelog
 * - Added a seventh border type parameter.
 * - All parameters are now optional.
 * - Improved styling.
 * - Bug fix: Text is always centered now.
 *
 * It accepts seven parameters:
 *
 * 1. `-type string` square as default or round for a rounded bar.
 * 2. `-type string` A hex color for the text.
 * 3. `-type string` A hex color for the border.
 * 4. `-type string` A hex color for the bar.
 * 5. `-type string` A hex color for the background.
 * 6. `-type integer` A number used to round the value.
 * 7. `-type string` A border style, default=ridge (solid, outset, groove, ridge)
 *
 *  DEMO : http://codepen.io/RedJokingInn/pen/jrkZQN
 *
 *  @name percentBar
 *  @summary Display percentage value as a bar
 *  @author [Drijkoningen Dirk](RedJokingInn)
 *  @requires DataTables 1.10+
 *
 *  @returns {String} Html code for bar
 *
 *  @example
 *    // Display rounded bars with white text, medium blue border, light blue bar, dark blue background, rounded to one decimal.
 *    $('#example').DataTable( {
 *      columnDefs: [ {
 *        targets: 4,
 *        render: $.fn.dataTable.render.percentBar( 'round','#FFF', '#269ABC', '#31B0D5', '#286090', 1, 'groove' )
 *      } ]
 *    } );
 *
 *  @example
 *    // All default values used. Square bars with black text, gray ridged border, light green bar, light gray background, rounded to integer.
 *    $('#example').DataTable( {
 *      columnDefs: [ {
 *        targets: 2,
 *        render: $.fn.dataTable.render.percentBar()
 *      } ]
 *    } );
 */

jQuery.fn.dataTable.render.percentBar = function(pShape, cText, cBorder, cBar, cBack, vRound, bType) {
  pShape = pShape || 'square';
  cText = cText || '#000';
  cBorder = cBorder || '#BCBCBC';
  cBar = cBar || '#5FD868';
  cBack = cBack || '#E6E6E6';
  vRound = vRound || 0;
  bType = bType || 'ridge';
  var barColor = cBar;
  var line_height = '20px';
  var font_size = '14px';
  //Bar templates
  var styleRule1 = 'max-width:100px;height:' + line_height + ';margin:0 auto;';
  var styleRule2 = 'border:2px '+bType+' '+cBorder+';line-height:' + line_height + ';font-size:' + font_size + ';color:'+cText+';background:'+cBack+';position:relative;';
  var styleRule3 = 'height:' + line_height + ';line-height:' + line_height + ';text-align:center;';
  //Square is default, make template round if pShape == round
  if(pShape=='round'){
    styleRule2 += 'border-radius:13px;';
    styleRule3 += 'border-radius:11px;';
  }
  styleRule3 += "background-color:";

  return function(d, type, row) {
    //Remove % if found in the value
    //Round to the given parameter vRound
    s = parseFloat(d.toString().replace(/\s%|%/g,'')).toFixed(vRound);
    //Not allowed to go over 100%
    if(s>100){s=100}
	if(s<0){s=0}
	sw = 20 + s * 0.8;
    
    // Order, search and type gets numbers
    if (type !== 'display') {
      return s;
    }
    if (typeof d !== 'number' && typeof d !== 'string') {
      return d;
    }

	var bc = barColor;
	if (bc == 'scale') {
	  var hue=(s/100*120).toString(10);
      bc = ["hsl(",hue,",100%,50%)"].join("");
	}
    
    //Return the code for the bar
    return '<div style="'+styleRule1+'"><div style="'+styleRule2+'"><div style="'+styleRule3+bc+';padding:auto 6px;width:'+sw+ '%;min-width: 20px;"></div><div style="width:100%;text-align:center;position:absolute;left:0;top:0;">'+s+'%</div></div></div>';
  };
};
