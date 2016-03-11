/*
 * Photostrip - jQuery plugin for laying out photos on a horizontally justified grid
 *
 * Copyright (c) 2015 Joonas Mankki
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://github.com/jiinus/photostrip
 *
 * Version:  1.0.0
 */
;(function ( $, window, document, undefined ) {

	"use strict";

	var pluginName = "photostrip",
		defaults = {
			height: 300,
			gap: 8,
			watchResize: true,
			direction: 'vertical',
		};

	function Plugin ( element, options ) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	$.extend(Plugin.prototype, {

		init: function() {

			this.layout();

			if (this.settings.watchResize) {
				var $el = $(this.element);
				var oldContainerWidth = $el.width();
				var self = this;
				$(window).on('resize.photostrip', function() {
					if ($el.width() != oldContainerWidth) {
						self.layout();
						oldContainerWidth = $el.width();
					}
				});
			}
		},

		update: function(options) {
			$.extend(this.settings, options);
			this.layout();
		},

		layout: function(retryIfScrollbarsAdded) {

			if (retryIfScrollbarsAdded === undefined) {
				retryIfScrollbarsAdded = true;
			}

			var $container = $(this.element);
			var containerWidth = $container.width();

			var currentColumn = 0;
			var totalHeight = 0;
			var numRemaining = $container.children().length;
			var totalAR = 0;
			var targetHeight = (this.settings.height instanceof Function) ? this.settings.height.call() : this.settings.height;
			var gap = this.settings.gap;
			var lastRowHeight = targetHeight;
			var containerPosition = $container.position();
			var windowHeight = $(window).height();
			var overScroll = false;

			var photoSizes = [];
			var children = $container.children().toArray();
			var numChildren = children.length;
			for (var childIndex = 0; childIndex < numChildren; childIndex++) {

				if ((containerPosition.top + totalHeight) >= windowHeight && !overScroll) {
					overScroll = true;
					$container.height(totalHeight + gap);
					containerWidth = $container.width();
					totalHeight = 0;
					photoSizes = [];
					totalAR = 0;
					numRemaining = numChildren;
					childIndex = 0;
				}

				//var $photo = $(this);
				var $photo = $(children[childIndex]);

				if ($photo.attr('data-hide') == 'true') {
					$photo.css('display', 'none');
					return true;
				}

				$photo.css('display', 'block');
				$photo.css('float', 'left');
				$photo.css('padding', (gap / 2) + 'px');

				var tw = $photo.attr('data-original-width') || $photo.width() || 1;
				var th = $photo.attr('data-original-height') || $photo.height() || 1;

				var size = {
					p: $photo,
					w: tw,
					h: th,
					r: tw / th
				}

				if (this.settings.direction == 'horizontal') {
					var _th = targetHeight;
					$photo.css({
						width: (_th * size.r) + 'px',
						height: _th + 'px'
					});
					continue;
				}

				photoSizes.push(size);

				currentColumn++;
				numRemaining--;

				totalAR += size.r;
				var rowWidth = 0;
				var commonHeight = Math.round(containerWidth / totalAR);
				var forceRowChange = false;

				// Make sure row is not less than 70% from the target height (but only if the row already has at least two photos)
				if (currentColumn > 2 && commonHeight < targetHeight * 0.7) {
					forceRowChange = true;
					childIndex--;
					currentColumn--;
					numRemaining++;
					photoSizes.pop();
					totalAR -= size.r;
				}

				var nextPhotoMinWidth = $photo.next().attr('data-photostrip-min-width') || this.settings.minWidth;
				if (nextPhotoMinWidth == undefined) nextPhotoMinWidth = 0;
				if (forceRowChange || (commonHeight <= targetHeight && numRemaining >= 1) || numRemaining == 0 || nextPhotoMinWidth > containerWidth) {
					var dynamicWidth = containerWidth - (gap * photoSizes.length);
					commonHeight = dynamicWidth / totalAR;

					if (nextPhotoMinWidth > containerWidth) {
						commonHeight = commonHeight;
					} else {
						// Allow 25% deviation up from targetHeight before capping
						if (commonHeight > targetHeight * 1.25) {
							commonHeight = (numRemaining == 0) ? targetHeight : targetHeight * 1.25;
						}
					}

					for (var i = 0; i < photoSizes.length; i++)
					{
						var photoSize = photoSizes[i];

						tw = Math.floor(commonHeight * photoSize.r) + gap;
						th = Math.round(commonHeight) + gap;

						// Do a tiny fix to pixel-perfectly align the right edge
						rowWidth += tw;
						if (i !== 0 && i == photoSizes.length - 1 && rowWidth < containerWidth - 1) {
							tw += Math.min(5, (containerWidth - rowWidth - 1));
						} else if (rowWidth == containerWidth) {
							tw -= 1;
						}

						photoSize.p.css('width', tw + 'px');
						photoSize.p.css('height', th + 'px');
					}

					totalHeight += commonHeight + gap;
					totalAR = 0;
					currentColumn = 0;
					photoSizes = Array();
				}
			};

			if (totalHeight < targetHeight) totalHeight = targetHeight;

			$container.height(totalHeight + (gap/2));

			// Check if container width shrunk after layout (due to possible scrollbar) and if so, redo... :/
			if (retryIfScrollbarsAdded && this.settings.direction != 'horizontal' && $container.width() < containerWidth) {
				console.log('--- redo layout');
				this.layout(false);
				return;
			}

			if (this.settings.complete) {
				this.settings.complete.call(this);
			}
		}
	});

	$.fn[ pluginName ] = function ( options ) {
		return this.each(function() {
			if ( !$.data( this, "plugin_" + pluginName ) ) {
				$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
			} else {
				var inst = $.data( this, "plugin_" + pluginName );
				inst.update(options);
			}
		});
	};

})(jQuery, window, document);