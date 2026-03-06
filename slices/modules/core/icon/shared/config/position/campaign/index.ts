import core from "./core";
import dwl from "./dwl";
import eoe from "./eoe";
import fhv from "./fhv";
import ptc from "./ptc";
import tcu from "./tcu";
import tdc from "./tdc";
import tde from "./tde";
import tfa from "./tfa";
import tic from "./tic";
import tsk from "./tsk";

export default {
	...core,
	...dwl,
	...ptc,
	...tcu,
	...tfa,
	...tde,
	...tic,
	...eoe,
	...tsk,
	...fhv,
	...tdc,
};
