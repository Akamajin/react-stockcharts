"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _GenericChartComponent = require("../../GenericChartComponent");

var _GenericChartComponent2 = _interopRequireDefault(_GenericChartComponent);

var _GenericComponent = require("../../GenericComponent");

var _utils = require("../../utils");

var _EdgeCoordinateV = require("../../coordinates/EdgeCoordinateV3");

var _MouseCoordinateY = require("../../coordinates/MouseCoordinateY");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InteractiveYCoordinateTrade = function (_Component) {
	_inherits(InteractiveYCoordinateTrade, _Component);

	function InteractiveYCoordinateTrade(props) {
		_classCallCheck(this, InteractiveYCoordinateTrade);

		var _this = _possibleConstructorReturn(this, (InteractiveYCoordinateTrade.__proto__ || Object.getPrototypeOf(InteractiveYCoordinateTrade)).call(this, props));

		_this.renderSVG = _this.renderSVG.bind(_this);
		_this.drawOnCanvas = _this.drawOnCanvas.bind(_this);
		_this.isHover = _this.isHover.bind(_this);
		return _this;
	}

	_createClass(InteractiveYCoordinateTrade, [{
		key: "isHover",
		value: function isHover(moreProps) {
			return false;
		}
	}, {
		key: "drawOnCanvas",
		value: function drawOnCanvas(ctx, moreProps) {
			var _props = this.props,
			    bgFill = _props.bgFill,
			    bgOpacity = _props.bgOpacity,
			    textFill = _props.textFill,
			    fontFamily = _props.fontFamily,
			    fontSize = _props.fontSize,
			    fontStyle = _props.fontStyle,
			    fontWeight = _props.fontWeight,
			    stroke = _props.stroke,
			    strokeWidth = _props.strokeWidth,
			    strokeOpacity = _props.strokeOpacity,
			    strokeDasharray = _props.strokeDasharray,
			    text = _props.text,
			    textBox = _props.textBox,
			    edge = _props.edge;
			var _props2 = this.props,
			    selected = _props2.selected,
			    hovering = _props2.hovering;


			var values = helper(this.props, moreProps);
			if (values == null) return;

			var x1 = values.x1,
			    x2 = values.x2,
			    y = values.y,
			    rect = values.rect;


			ctx.strokeStyle = (0, _utils.hexToRGBA)(stroke, strokeOpacity);

			ctx.beginPath();
			if (selected || hovering) {
				ctx.lineWidth = strokeWidth + 1;
			} else {
				ctx.lineWidth = strokeWidth;
			}
			ctx.textBaseline = "middle";
			ctx.textAlign = "start";
			ctx.font = fontStyle + " " + fontWeight + " " + fontSize + "px " + fontFamily;

			this.width = textBox.padding.left + ctx.measureText(text).width + textBox.padding.right + textBox.closeIcon.padding.left + textBox.closeIcon.width + textBox.closeIcon.padding.right;

			ctx.setLineDash((0, _utils.getStrokeDasharrayCanvas)(strokeDasharray));
			ctx.moveTo(x1, y);
			ctx.lineTo(rect.x, y);

			ctx.moveTo(rect.x + this.width, y);
			ctx.lineTo(x2, y);
			ctx.stroke();

			ctx.setLineDash([]);

			ctx.fillStyle = (0, _utils.hexToRGBA)(bgFill, bgOpacity);

			ctx.fillRect(rect.x, rect.y, this.width, rect.height);
			ctx.strokeRect(rect.x, rect.y, this.width, rect.height);

			ctx.fillStyle = textFill;

			ctx.beginPath();
			ctx.fillText(text, rect.x + 10, y);
			var newEdge = _extends({}, edge, {
				textFill: textFill,
				fontFamily: fontFamily,
				fontSize: fontSize,
				opacity: bgOpacity
			});
			var yValue = edge.displayFormat(this.props.yValue);
			var yCoord = (0, _MouseCoordinateY.getYCoordinate)(y, yValue, newEdge, moreProps);
			(0, _EdgeCoordinateV.drawOnCanvas)(ctx, yCoord);
		}
	}, {
		key: "renderSVG",
		value: function renderSVG(moreProps) {
			const {yValue, bgFill, bgOpacity, textFill, fontFamily, fontSize, fontStyle, fontWeight, stroke, strokeWidth, strokeOpacity, strokeDasharray, startX, labelStartX, uid, profitText,text, edge, selected, hovering } = this.props;
			var xScale = moreProps.xScale,
				yScale = moreProps.chartConfig.yScale;
			var lineCoordinates1 = { x1: xScale(startX), y1: Math.round(yScale(yValue)), x2: moreProps.width, y2: Math.round(yScale(yValue))};
			var lineCoordinates2 = { x1: labelStartX, y1: Math.round(yScale(yValue)), x2: moreProps.width, y2: Math.round(yScale(yValue))};

			var tradeLabel = _react2.default.createElement("g",{
				key: "labelParent",
				x: labelStartX,
				y: lineCoordinates1.y1-12,
				width: 45,
				height: 24,
				className: "trade_label",
			}, [
					_react2.default.createElement("rect",{
						key: "amountLabel",
						x: labelStartX,
						y: lineCoordinates1.y1-12,
						width: 45,
						height: 24,
						fill: bgFill,
						rx: 3,
						style: {
							stroke: stroke,
							strokeWidth: strokeWidth,
							strokeOpacity: strokeOpacity,
							strokeDasharray: strokeDasharray
						}
					}),
					_react2.default.createElement("text",{
						key: "labelText",
						x: labelStartX+6,
						y: lineCoordinates1.y1+4,
						fontFamily: fontFamily,
						fontSize: fontSize,
						fontStyle: fontStyle,
						fontWeight: fontWeight,
						style: { fill: textFill	}
					}, text),
					_react2.default.createElement("g",{
						key: "popup",
						x: labelStartX,
						y: lineCoordinates1.y1-12,
						width: 45,
						height: 24,
						className: "trade_label",
					},[
						_react2.default.createElement("rect",{
							key: "popupBg",
							x: labelStartX-29,
							y: lineCoordinates1.y1-75,
							width: 100,
							height: 60,
							fill: "#181a26",
							rx: 3,
							style: {
								stroke: "#22293b",
								strokeWidth: 4,
								strokeOpacity: 0,
								strokeDasharray: strokeDasharray
							}
						}),
						_react2.default.createElement("text",{
							key: "popupText",
							x: labelStartX-20,
							y: lineCoordinates1.y1-57,
							fontFamily: fontFamily,
							fontSize: fontSize,
							fontStyle: fontStyle,
							fontWeight: fontWeight,
							style: { fill: textFill	}
						}, "Close the trade"),
						_react2.default.createElement("rect",{
							key: "popupButton",
							className: "popup-button",
							x: labelStartX-20,
							y: lineCoordinates1.y1-43,
							width: 82,
							height: 20,
							fill: "#343e58",
							rx: 3,
							onClick: ()=>{this.props.onCloseTrade(uid)},
						}),
						_react2.default.createElement("text",{
							key: "popupButtonText",
							x: labelStartX + 7 - profitText.length,
							y: lineCoordinates1.y1-28,
							fontFamily: fontFamily,
							fontSize: fontSize,
							fontStyle: fontStyle,
							fontWeight: fontWeight,
							style: { fill: textFill	}
						}, profitText),
					])
				]);

			return [
				_react2.default.createElement("circle",{
					key: "iyc4",
					cx: lineCoordinates1.x1,
					cy: lineCoordinates1.y1,
					r: 3,
					fill: "#fff"
				}),
				_react2.default.createElement("line", _extends({
					key: "iyc0",
					className: "interactive-line",
					strokeDasharray: "2, 6",
					stroke: stroke,
					strokeWidth: strokeWidth,
					strokeOpacity: strokeOpacity
				}, lineCoordinates1)),
				_react2.default.createElement("line", _extends({
					key: "iyc1",
					className: "interactive-line",
					strokeDasharray: "2, 6",
					stroke: stroke,
					strokeWidth: strokeWidth,
					strokeOpacity: strokeOpacity
				}, lineCoordinates2)),
				tradeLabel
			];
		}
	}, {
		key: "render",
		value: function render() {
			var interactiveCursorClass = this.props.interactiveCursorClass;
			var _props3 = this.props,
			    onHover = _props3.onHover,
			    onUnHover = _props3.onUnHover;
			var _props4 = this.props,
			    onDragStart = _props4.onDragStart,
			    onDrag = _props4.onDrag,
			    onDragComplete = _props4.onDragComplete;


			return _react2.default.createElement(_GenericChartComponent2.default, {
				clip: false,
				xxxyyy: true,
				isHover: this.isHover,

				svgDraw: this.renderSVG,
				canvasToDraw: _GenericComponent.getMouseCanvas,
				canvasDraw: this.drawOnCanvas,

				interactiveCursorClass: interactiveCursorClass
				/* selected={selected} */
				,enableDragOnHover: true,

				onDragStart: onDragStart,
				onDrag: onDrag,
				onDragComplete: onDragComplete,
				onHover: onHover,
				onUnHover: onUnHover,

				drawOn: ["mousemove", "mouseleave", "pan", "drag"]
			});
		}
	}]);

	return InteractiveYCoordinateTrade;
}(_react.Component);

function helper(props, moreProps) {
	var yValue = props.yValue,
	    textBox = props.textBox;
	var _moreProps$chartConfi = moreProps.chartConfig,
	    width = _moreProps$chartConfi.width,
	    yScale = _moreProps$chartConfi.yScale,
	    height = _moreProps$chartConfi.height;


	var y = Math.round(yScale(yValue));

	if (y >= 0 && y <= height) {
		var rect = {
			x: textBox.left,
			y: y - textBox.height / 2,
			height: textBox.height
		};
		return {
			x1: 0,
			x2: width,
			y: y,
			rect: rect
		};
	}
}

InteractiveYCoordinateTrade.propTypes = {
	bgFill: _propTypes2.default.string.isRequired,
	bgOpacity: _propTypes2.default.number.isRequired,

	stroke: _propTypes2.default.string.isRequired,
	strokeWidth: _propTypes2.default.number.isRequired,
	strokeOpacity: _propTypes2.default.number.isRequired,
	strokeDasharray: _propTypes2.default.string.isRequired,

	textFill: _propTypes2.default.string.isRequired,
	fontFamily: _propTypes2.default.string.isRequired,
	fontSize: _propTypes2.default.number.isRequired,
	fontWeight: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]).isRequired,
	fontStyle: _propTypes2.default.string.isRequired,

	text: _propTypes2.default.string.isRequired,
	edge: _propTypes2.default.object.isRequired,
	textBox: _propTypes2.default.object.isRequired,
	yValue: _propTypes2.default.number.isRequired,
	startX: _propTypes2.default.number.isRequired,
	labelStartX: _propTypes2.default.number.isRequired,
	profitText: _propTypes2.default.string.isRequired,

	onDragStart: _propTypes2.default.func.isRequired,
	onDrag: _propTypes2.default.func.isRequired,
	onDragComplete: _propTypes2.default.func.isRequired,
	onHover: _propTypes2.default.func,
	onUnHover: _propTypes2.default.func,

	defaultClassName: _propTypes2.default.string,
	interactiveCursorClass: _propTypes2.default.string,

	tolerance: _propTypes2.default.number.isRequired,
	selected: _propTypes2.default.bool.isRequired,
	hovering: _propTypes2.default.bool.isRequired
};

InteractiveYCoordinateTrade.defaultProps = {
	onDragStart: _utils.noop,
	onDrag: _utils.noop,
	onDragComplete: _utils.noop,
	fontWeight: "normal", // standard dev

	strokeWidth: 1,
	tolerance: 4,
	selected: false,
	hovering: false
};

exports.default = InteractiveYCoordinateTrade;