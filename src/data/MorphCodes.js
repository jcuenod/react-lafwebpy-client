const term_to_english = {
	"categories": {
		"sp": "Part of Speech",
		"vs": "Stem",
		"vt": "Tense",
		"lex": "Sense Lexeme",
		"lex_utf8": "Sense Lexeme",
		"g_cons_utf8": "Inflected Consonants",
		"tricons": "Consonantal Root",
		"ps": "Person",
		"gn": "Gender",
		"nu": "Number",
		"g_prs_utf8": "Pronominal Suffix",
		"prs_gn": "Prn. sfx Gender",
		"prs_nu": "Prn. sfx Number",
		"prs_ps": "Prn. sfx Person",
		"st": "State",
		"accent": "Accent",
		"accent_quality": "Accent Type",
		"is_definite": "Definite",
		"has_suffix": "Has Pron. Suffix",
		"g_uvf_utf8": "Univalent Final",
		"sdbh": "Semantic Domain",
		"lxxlexeme": "LXX Lexeme",
		"gloss": "Gloss",
		"rootregex": "Root Regex",
		"invert": "Invert (search helper)",
		"book": "Book",
		"ch": "Chapter",
		"v": "Verse",
	},
	"is_definite": {
		"det": "Yes",
		"und": "No",
	},
	"sp": {
		"art": "Article",
		"verb": "Verb",
		"subs": "Noun",
		"nmpr": "Proper noun",
		"advb": "Adverb",
		"prep": "Preposition",
		"conj": "Conjunction",
		"prps": "Pers. pronoun",
		"prde": "Demons. pron.",
		"prin": "Interr. pronoun",
		"intj": "Interjection",
		"nega": "Negative",
		"inrg": "Interrogative",
		"adjv": "Adjective",
	},
	"nu": {
		"sg": "Singular",
		"du": "Dual",
		"pl": "Plural",
		"unknown": "Unknown",
		"NA": "NA",
	},
	"prs_nu": {
		"sg": "Singular",
		"du": "Dual",
		"pl": "Plural",
		"unknown": "Unknown",
		"NA": "NA",
	},
	"gn": {
		"m": "Masculine",
		"f": "Feminine",
		"unknown": "Unknown",
		"NA": "NA",
	},
	"prs_gn": {
		"m": "Masculine",
		"f": "Feminine",
		"unknown": "Unknown",
		"NA": "NA",
	},
	"ps": {
		"p1": "First",
		"p2": "Second",
		"p3": "Third",
		"unknown": "Unknown",
		"NA": "NA",
	},
	"prs_ps": {
		"p1": "First",
		"p2": "Second",
		"p3": "Third",
		"unknown": "Unknown",
		"NA": "NA",
	},
	"vt": {
		"perf": "Perfect",
		"impf": "Imperfect",
		"wayq": "Wayyiqtol",
		"impv": "Imperative",
		"infa": "Infinitive (Absolute)",
		"infc": "Infinitive (Construct)",
		"ptca": "Participle",
		"ptcp": "Participle (Passive)",
		"NA": "NA",
	},
	"vs": {
		"hif": "Hif‘il (H)",
		"hit": "Hitpa“el (H)",
		"htpo": "Hitpo“el (H)",
		"hof": "Hof‘al (H)",
		"nif": "Nif‘al (H)",
		"piel": "Pi“el (H)",
		"poal": "Po“al (H)",
		"poel": "Po“el (H)",
		"pual": "Pu“al (H)",
		"qal": "Qal (H)",
		"afel": "Af‘el (Ar)",
		"etpa": "Etpa“al (Ar)",
		"etpe": "Etpe‘el (Ar)",
		"haf": "Haf‘el (Ar)",
		"hotp": "Hotpa“al (Ar)",
		"hsht": "Hishtaf‘al (Ar)",
		"htpa": "Hitpa“al (Ar)",
		"htpe": "Hitpe‘el (Ar)",
		"nit": "Nitpa“el (Ar)",
		"pael": "Pa“el (Ar)",
		"peal": "Pe‘al (Ar)",
		"peil": "Pe‘il (Ar)",
		"shaf": "Shaf‘el (Ar)",
		"tif": "Tif‘al (Ar)",
		"pasq": "Passiveqal (Ar)",
		"NA": "NA",
	},
	"st": {
		"a": "Absolute",
		"c": "Construct",
		"e": "Emphatic",
		"NA": "NA",
	},
	"invert": {
		"t": "True",
		"f": "False",
	}
}
const category_weights = {
	"vs": -10,
	"vt": -9,
	"lex": -8,
	"lex_utf8": -8,
	"tricons": -8.1,
	"ps": -7,
	"gn": -6,
	"nu": -5,
	"sp": -4,
	"g_prs_utf8": 1,
	"prs_gn": 1.2,
	"prs_nu": 1.3,
	"prs_ps": 1.1,
	"accent": 3,
	"accent_quality": 3.1,
	"sdbh": 4,
	"g_cons_utf8": 5,
	"lxxlexeme": 5.1,
	"gloss": 6,
	"invert": 10,
}

const clause_types = {
	"AjCl": "Adjective clause",
	"CPen": "Casus pendens",
	"Defc": "Defective clause atom",
	"Ellp": "Ellipsis",
	"InfA": "Infinitive absolute clause",
	"InfC": "Infinitive construct clause",
	"MSyn": "Macrosyntactic sign",
	"NmCl": "Nominal clause",
	"Ptcp": "Participle clause",
	"Reop": "Reopening",
	"Unkn": "Unknown",
	"Voct": "Vocative clause",
	"Way0": "Wayyiqtol-null clause",
	"WayX": "Wayyiqtol-X clause",
	"WIm0": "We-imperative-null clause",
	"WImX": "We-imperative-X clause",
	"WQt0": "We-qatal-null clause",
	"WQtX": "We-qatal-X clause",
	"WxI0": "We-x-imperative-null clause",
	"WXIm": "We-X-imperative clause",
	"WxIX": "We-x-imperative-X clause",
	"WxQ0": "We-x-qatal-null clause",
	"WXQt": "We-X-qatal clause",
	"WxQX": "We-x-qatal-X clause",
	"WxY0": "We-x-yiqtol-null clause",
	"WXYq": "We-X-yiqtol clause",
	"WxYX": "We-x-yiqtol-X clause",
	"WYq0": "We-yiqtol-null clause",
	"WYqX": "We-yiqtol-X clause",
	"xIm0": "x-imperative-null clause",
	"XImp": "X-imperative clause",
	"xImX": "x-imperative-X clause",
	"XPos": "Extraposition",
	"xQt0": "x-qatal-null clause",
	"XQtl": "X-qatal clause",
	"xQtX": "x-qatal-X clause",
	"xYq0": "x-yiqtol-null clause",
	"XYqt": "X-yiqtol clause",
	"xYqX": "x-yiqtol-X clause",
	"ZIm0": "Zero-imperative-null clause",
	"ZImX": "Zero-imperative-X clause",
	"ZQt0": "Zero-qatal-null clause",
	"ZQtX": "Zero-qatal-X clause",
	"ZYq0": "Zero-yiqtol-null clause",
	"ZYqX": "Zero-yiqtol-X clause",
}

export { term_to_english, category_weights, clause_types }
