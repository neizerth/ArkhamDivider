import app from "./app";
import investigator from "./investigator";
import player from "./player";
import skills from "./skills";

export default {
	...skills,
	...investigator,
	...player,
	...app,
};
