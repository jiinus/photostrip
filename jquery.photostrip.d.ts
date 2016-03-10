interface PhotostripOptions {
	height?: number|Function;
	minWidth?: number;
	gap?: number;
	watchResize?: boolean;
	direction?: string;
}

interface JQuery {
	photostrip(options?:PhotostripOptions):JQuery;
	update(options?:PhotostripOptions):JQuery;
}