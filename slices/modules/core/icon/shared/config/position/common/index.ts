import app from "./app";
import cost from "./cost";
import investigator from "./investigator";
import other from "./other";
import player from "./player";
import signs from "./signs";
import skills from "./skills";
import tokens from "./tokens";

export default {
	...skills,
	...investigator,
	...player,
	...app,
	...cost,
	...tokens,
	...signs,
	...other,
};
