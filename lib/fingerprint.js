"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const murmur_1 = require("./murmur");
const crypto_1 = require("crypto");
const webGLMetadata = [
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) Iris(R) Xe Graphics (0x00009A40) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (AMD)",
        "renderer": "ANGLE (AMD, AMD Radeon(TM) Graphics (0x000015D8) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) HD Graphics Family (0x00000A16) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) UHD Graphics 620 (0x00005917) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) HD Graphics 520 Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) HD Graphics 5500 (0x00001616) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (NVIDIA)",
        "renderer": "ANGLE (NVIDIA, NVIDIA GeForce GTX 1060 6GB (0x00001C03) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) UHD Graphics 630 (0x00009BC8) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (AMD)",
        "renderer": "ANGLE (AMD, AMD Radeon(TM) RX Vega 11 Graphics (0x000015D8) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) UHD Graphics 620 Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (NVIDIA)",
        "renderer": "ANGLE (NVIDIA, NVIDIA GeForce GTX 650 (0x00000FC6) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) HD Graphics 630 (0x00005912) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) Iris(R) Xe Graphics (0x00009A49) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (NVIDIA)",
        "renderer": "ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 Ti Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (NVIDIA)",
        "renderer": "ANGLE (NVIDIA, NVIDIA GeForce GT 730 (0x00001287) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) UHD Graphics 620 (0x00005917) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) UHD Graphics 630 Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) HD Graphics 630 Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) HD Graphics 530 (0x00001912) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (AMD)",
        "renderer": "ANGLE (AMD, Radeon RX 580 Series Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) HD Graphics 630 (0x00005912) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (NVIDIA)",
        "renderer": "ANGLE (NVIDIA, NVIDIA GeForce GTX 1650 (0x00001F82) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) HD Graphics 5500 (0x00001616) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) HD Graphics 5500 (0x00001616) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) UHD Graphics (0x00009B41) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (NVIDIA)",
        "renderer": "ANGLE (NVIDIA, NVIDIA GeForce GTX 1660 SUPER Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) HD Graphics 530 Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) HD Graphics 620 (0x00005916) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (AMD)",
        "renderer": "ANGLE (AMD, AMD Radeon(TM) Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) UHD Graphics 600 (0x00003185) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) HD Graphics Family (0x00000A16) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) HD Graphics 520 (0x00001916) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (NVIDIA)",
        "renderer": "ANGLE (NVIDIA, NVIDIA GeForce GTX 970 (0x000013C2) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) UHD Graphics (0x00009B41) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) HD Graphics 4600 Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) UHD Graphics (0x00009BC4) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) UHD Graphics 620 (0x00003EA0) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) UHD Graphics 630 (0x00003E98) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (NVIDIA)",
        "renderer": "ANGLE (NVIDIA, NVIDIA GeForce GT 650M (0x00000FD1) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) Iris(R) Xe Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) HD Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) HD Graphics 4600 (0x00000416) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) Iris(R) Xe Graphics (0x00009A49) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) UHD Graphics 630 (0x00003E92) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) HD Graphics 4600 (0x00000416) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (NVIDIA)",
        "renderer": "ANGLE (NVIDIA, NVIDIA GeForce GTX 1070 (0x00001B81) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (AMD)",
        "renderer": "ANGLE (AMD, AMD Radeon(TM) Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (NVIDIA)",
        "renderer": "ANGLE (NVIDIA, NVIDIA GeForce GT 650M (0x00000FD1) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    },
    {
        "vendor": "Google Inc. (Intel)",
        "renderer": "ANGLE (Intel, Intel(R) UHD Graphics (0x00008A56) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    }
]
const baseFingerprint = {
    DNT: "unknown",
    L: "en-US",
    D: 24,
    PR: 1,
    S: [1920, 1200],
    AS: [1920, 1200],
    TO: 9999,
    SS: true,
    LS: true,
    IDB: true,
    B: false,
    ODB: true,
    CPUC: "unknown",
    PK: "Win32",
    CFP: `canvas winding:yes~canvas fp:data:image/png;base64,${Buffer.from(Math.random().toString()).toString("base64")}`,
    FR: false,
    FOS: false,
    FB: false,
    JSF: [
        "Andale Mono",
        "Arial",
        "Arial Black",
        "Arial Hebrew",
        "Arial MT",
        "Arial Narrow",
        "Arial Rounded MT Bold",
        "Arial Unicode MS",
        "Bitstream Vera Sans Mono",
        "Book Antiqua",
        "Bookman Old Style",
        "Calibri",
        "Cambria",
        "Cambria Math",
        "Century",
        "Century Gothic",
        "Century Schoolbook",
        "Comic Sans",
        "Comic Sans MS",
        "Consolas",
        "Courier",
        "Courier New",
        "Garamond",
        "Geneva",
        "Georgia",
        "Helvetica",
        "Helvetica Neue",
        "Impact",
        "Lucida Bright",
        "Lucida Calligraphy",
        "Lucida Console",
        "Lucida Fax",
        "LUCIDA GRANDE",
        "Lucida Handwriting",
        "Lucida Sans",
        "Lucida Sans Typewriter",
        "Lucida Sans Unicode",
        "Microsoft Sans Serif",
        "Monaco",
        "Monotype Corsiva",
        "MS Gothic",
        "MS Outlook",
        "MS PGothic",
        "MS Reference Sans Serif",
        "MS Sans Serif",
        "MS Serif",
        "MYRIAD",
        "MYRIAD PRO",
        "Palatino",
        "Palatino Linotype",
        "Segoe Print",
        "Segoe Script",
        "Segoe UI",
        "Segoe UI Light",
        "Segoe UI Semibold",
        "Segoe UI Symbol",
        "Tahoma",
        "Times",
        "Times New Roman",
        "Times New Roman PS",
        "Trebuchet MS",
        "Verdana",
        "Wingdings",
        "Wingdings 2",
        "Wingdings 3",
    ],
    P: 'Chrome PDF Viewer,Chromium PDF Viewer,Microsoft Edge PDF Viewer,PDF Viewer,WebKit built-in PDF',
    T: [0, false, false],
    H: 24,
    SWF: false, // Flash support
};
const languages = [
    "af", "af-ZA", "ar", "ar-AE", "ar-BH", "ar-DZ", "ar-EG", "ar-IQ", "ar-JO", "ar-KW", "ar-LB", "ar-LY", "ar-MA", "ar-OM", "ar-QA", "ar-SA",
    "ar-SY", "ar-TN", "ar-YE", "az", "az-AZ", "az-AZ", "be", "be-BY", "bg", "bg-BG", "bs-BA", "ca", "ca-ES", "cs", "cs-CZ", "cy",
    "cy-GB", "da", "da-DK", "de", "de-AT", "de-CH", "de-DE", "de-LI", "de-LU", "dv", "dv-MV", "el", "el-GR", "en", "en-AU", "en-BZ",
    "en-CA", "en-CB", "en-GB", "en-IE", "en-JM", "en-NZ", "en-PH", "en-TT", "en-US", "en-ZA", "en-ZW", "eo", "es", "es-AR", "es-BO", "es-CL",
    "es-CO", "es-CR", "es-DO", "es-EC", "es-ES", "es-ES", "es-GT", "es-HN", "es-MX", "es-NI", "es-PA", "es-PE", "es-PR", "es-PY", "es-SV", "es-UY",
    "es-VE", "et", "et-EE", "eu", "eu-ES", "fa", "fa-IR", "fi", "fi-FI", "fo", "fo-FO", "fr", "fr-BE", "fr-CA", "fr-CH", "fr-FR",
    "fr-LU", "fr-MC", "gl", "gl-ES", "gu", "gu-IN", "he", "he-IL", "hi", "hi-IN", "hr", "hr-BA", "hr-HR", "hu", "hu-HU", "hy",
    "hy-AM", "id", "id-ID", "is", "is-IS", "it", "it-CH", "it-IT", "ja", "ja-JP", "ka", "ka-GE", "kk", "kk-KZ", "kn", "kn-IN",
    "ko", "ko-KR", "kok", "kok-IN", "ky", "ky-KG", "lt", "lt-LT", "lv", "lv-LV", "mi", "mi-NZ", "mk", "mk-MK", "mn", "mn-MN",
    "mr", "mr-IN", "ms", "ms-BN", "ms-MY", "mt", "mt-MT", "nb", "nb-NO", "nl", "nl-BE", "nl-NL", "nn-NO", "ns", "ns-ZA", "pa",
    "pa-IN", "pl", "pl-PL", "ps", "ps-AR", "pt", "pt-BR", "pt-PT", "qu", "qu-BO", "qu-EC", "qu-PE", "ro", "ro-RO", "ru", "ru-RU",
    "sa", "sa-IN", "se", "se-FI", "se-FI", "se-FI", "se-NO", "se-NO", "se-NO", "se-SE", "se-SE", "se-SE", "sk", "sk-SK", "sl", "sl-SI",
    "sq", "sq-AL", "sr-BA", "sr-BA", "sr-SP", "sr-SP", "sv", "sv-FI", "sv-SE", "sw", "sw-KE", "syr", "syr-SY", "ta", "ta-IN", "te",
    "te-IN", "th", "th-TH", "tl", "tl-PH", "tn", "tn-ZA", "tr", "tr-TR", "tt", "tt-RU", "ts", "uk", "uk-UA", "ur", "ur-PK",
    "uz", "uz-UZ", "uz-UZ", "vi", "vi-VN", "xh", "xh-ZA", "zh", "zh-CN", "zh-HK", "zh-MO", "zh-SG", "zh-TW", "zu", "zu-ZA"
];
const timeOffsets = [-420, -360, -300, -240, -120, -60, 0, 60, 120, 240, 300, 360, 420];
let screenRes = [
    [1920, 1080],
    [1920, 1200],
    [2048, 1080],
    [2560, 1440],
    [1366, 768],
    [1440, 900],
    [1536, 864],
    [1680, 1050],
    [1280, 1024],
    [1280, 800],
    [1280, 720],
    [1600, 1200],
    [1600, 900],
];
function randomScreenRes() {
    return screenRes[Math.floor(Math.random() * screenRes.length)];
}
// Get fingerprint
function getFingerprint() {
    let fingerprint = { ...baseFingerprint }; // Create a copy of the base fingerprint
    // Randomization time!
    fingerprint["DNT"] = "unknown";
    //fingerprint["L"] = 'vi-VN';
    fingerprint["L"] = 'en-US';
    fingerprint["D"] = [8, 24][Math.floor(Math.random() * 2)];
    fingerprint["PR"] = Math.floor(Math.random() * 3) + 1;
    fingerprint["AS"] = randomScreenRes();
    fingerprint["S"] = fingerprint.AS.map((value, index) => (index === 0 ? value : value + 40));
    fingerprint["TO"] = -420;
    fingerprint["SS"] = true;
    fingerprint["LS"] = true;
    fingerprint["IDB"] = true;
    fingerprint["B"] = false;
    fingerprint["ODB"] = Math.random() > 0.5;
    fingerprint["CPUC"] = "unknown";
    fingerprint["PK"] = 'Win32'
    fingerprint["CFP"] = "canvas winding:yes~canvas fp:data:image/png;base64," + (0, crypto_1.randomBytes)(128).toString("base64");
    fingerprint["FR"] = false; // Fake Resolution
    fingerprint["FOS"] = false; // Fake Operating System
    fingerprint["FB"] = false; // Fake Browser
    fingerprint["JSF"] = fingerprint["JSF"].filter(() => Math.random() > 0.5);
    //fingerprint["P"] = fingerprint["P"].filter(() => Math.random() > 0.5);
    fingerprint["P"] = fingerprint["P"];
    fingerprint["T"] = [
        0,
        false,
        false,
    ];
    fingerprint["H"] = 2 ** Math.floor(Math.random() * 6);
    fingerprint["SWF"] = fingerprint["SWF"]; // RIP Flash
    return fingerprint;
}
function prepareF(fingerprint) {
    let f = [];
    let keys = Object.keys(fingerprint);
    for (let i = 0; i < keys.length; i++) {
        if (fingerprint[keys[i]].join)
            f.push(fingerprint[keys[i]].join(";"));
        else
            f.push(fingerprint[keys[i]]);
    }
    return f.join("~~~");
}
function prepareFe(fingerprint) {
    let fe = [];
    let keys = Object.keys(fingerprint);
    for (let i = 0; i < keys.length; i++) {
        switch (keys[i]) {
            case "CFP":
                fe.push(`${keys[i]}:${cfpHash(fingerprint[keys[i]])}`);
                break;
            default:
                fe.push(`${keys[i]}:${fingerprint[keys[i]]}`);
                break;
        }
    }
    return fe;
}
function generateRandomTree(maxDepth) {
    if (maxDepth <= 0 || Math.random() < 0.2) {
        // Base case: return an empty array
        return [];
    } else {
        // Recursive case: generate a nested array
        const randomDepth = Math.floor(Math.random() * maxDepth) + 1;
        const subtree = generateRandomTree(randomDepth - 1);
        return [subtree, generateRandomTree(maxDepth - randomDepth)];
    }
}

function cfpHash(H8W) {
    var l8W, U8W;
    if (!H8W)
        return "";
    if (Array.prototype.reduce)
        return H8W.split("").reduce(function (p8W, z8W) {
            p8W = (p8W << 5) - p8W + z8W.charCodeAt(0);
            return p8W & p8W;
        }, 0);
    l8W = 0;
    if (H8W.length === 0)
        return l8W;
    for (var k8W = 0; k8W < H8W.length; k8W++) {
        U8W = H8W.charCodeAt(k8W);
        l8W = (l8W << 5) - l8W + U8W;
        l8W = l8W & l8W;
    }
    return l8W;
}
let baseEnhancedFingerprint = {
    "webgl_extensions": "ANGLE_instanced_arrays;EXT_blend_func_extended;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_texture_mirror_clamp_to_edge;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode",
    "webgl_extensions_hash": "f438fad1803f3fba61f0d38d689fde0b",
    "webgl_renderer": "WebKit WebGL",
    "webgl_vendor": "WebKit",
    "webgl_version": "WebGL 1.0 (OpenGL ES 2.0 Chromium)",
    "webgl_shading_language_version": "WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)",
    "webgl_aliased_line_width_range": "[1, 1]",
    "webgl_aliased_point_size_range": "[1, 1024]",
    "webgl_antialiasing": "yes",
    "webgl_bits": "8,8,24,8,8,0",
    "webgl_max_params": "16,32,16384,1024,16384,16,16384,30,16,16,4096",
    "webgl_max_viewport_dims": "[32767, 32767]",
    "webgl_unmasked_vendor": "Google Inc. (Intel)",
    "webgl_unmasked_renderer": "ANGLE (Intel, Intel(R) UHD Graphics 750 (0x00004C8A) Direct3D11 vs_5_0 ps_5_0, D3D11)",
    "webgl_vsf_params": "23,127,127,23,127,127,23,127,127",
    "webgl_vsi_params": "0,31,30,0,31,30,0,31,30",
    "webgl_fsf_params": "23,127,127,23,127,127,23,127,127",
    "webgl_fsi_params": "0,31,30,0,31,30,0,31,30",
    "webgl_hash_webgl": "a658d743a2d2d50fcefa1d08e3b34541",
    "user_agent_data_brands": "Not_A Brand,Chromium,Google Chrome",
    "user_agent_data_mobile": false,
    "navigator_connection_downlink": parseFloat((Math.random() * (10 - 5) + 5).toFixed(1)),
    "navigator_connection_downlink_max": null,
    "network_info_rtt": 50,
    "network_info_save_data": false,
    "network_info_rtt_type": null,
    "screen_pixel_depth": 24,
    "navigator_device_memory": 8,
    "navigator_pdf_viewer_enabled": true,
    "navigator_languages": "en-US,en",
    "window_inner_width": 0,
    "window_inner_height": 0,
    "window_outer_width": 2195,
    "window_outer_height": 1195,
    "browser_detection_firefox": false,
    "browser_detection_brave": false,
    "browser_api_checks": [
        "permission_status: true",
        "eye_dropper: true",
        "audio_data: true",
        "writable_stream: true",
        "css_style_rule: true",
        "navigator_ua: true",
        "barcode_detector: false",
        "display_names: true",
        "contacts_manager: false",
        "svg_discard_element: false",
        "usb: defined",
        "media_device: defined",
        "playback_quality: true"
    ],
    "browser_object_checks": "554838a8451ac36cb977e719e9d6623c",
    "audio_codecs": "{\"ogg\":\"probably\",\"mp3\":\"probably\",\"wav\":\"probably\",\"m4a\":\"maybe\",\"aac\":\"probably\"}",
    "audio_codecs_extended": "{\"audio/mp4; codecs=\\\"mp4a.40\\\"\":{\"canPlay\":\"maybe\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.1\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.2\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":true},\"audio/mp4; codecs=\\\"mp4a.40.3\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.4\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.5\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":true},\"audio/mp4; codecs=\\\"mp4a.40.6\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.7\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.8\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.9\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.12\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.13\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.14\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.15\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.16\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.17\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.19\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.20\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.21\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.22\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.23\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.24\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.25\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.26\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.27\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.28\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.29\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":true},\"audio/mp4; codecs=\\\"mp4a.40.32\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.33\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.34\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.35\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.40.36\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.66\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.67\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":true},\"audio/mp4; codecs=\\\"mp4a.68\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.69\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp4a.6B\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"mp3\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"flac\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":true},\"audio/mp4; codecs=\\\"bogus\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"aac\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"ac3\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mp4; codecs=\\\"A52\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/mpeg; codecs=\\\"mp3\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":false},\"audio/wav; codecs=\\\"0\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/wav; codecs=\\\"2\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/wave; codecs=\\\"0\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/wave; codecs=\\\"1\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/wave; codecs=\\\"2\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/x-wav; codecs=\\\"0\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/x-wav; codecs=\\\"1\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":false},\"audio/x-wav; codecs=\\\"2\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/x-pn-wav; codecs=\\\"0\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/x-pn-wav; codecs=\\\"1\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"audio/x-pn-wav; codecs=\\\"2\\\"\":{\"canPlay\":\"\",\"mediaSource\":false}}",
    "audio_codecs_extended_hash": "805036349642e2569ec299baed02315b",
    "video_codecs": "{\"ogg\":\"\",\"h264\":\"probably\",\"webm\":\"probably\",\"mpeg4v\":\"\",\"mpeg4a\":\"\",\"theora\":\"\"}",
    "video_codecs_extended": "{\"video/mp4; codecs=\\\"hev1.1.6.L93.90\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":true},\"video/mp4; codecs=\\\"hvc1.1.6.L93.90\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":true},\"video/mp4; codecs=\\\"hev1.1.6.L93.B0\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":true},\"video/mp4; codecs=\\\"hvc1.1.6.L93.B0\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":true},\"video/mp4; codecs=\\\"vp09.00.10.08\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":true},\"video/mp4; codecs=\\\"vp09.00.50.08\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":true},\"video/mp4; codecs=\\\"vp09.01.20.08.01\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":true},\"video/mp4; codecs=\\\"vp09.01.20.08.01.01.01.01.00\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":true},\"video/mp4; codecs=\\\"vp09.02.10.10.01.09.16.09.01\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":true},\"video/mp4; codecs=\\\"av01.0.08M.08\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":true},\"video/webm; codecs=\\\"vorbis\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":true},\"video/webm; codecs=\\\"vp8\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":true},\"video/webm; codecs=\\\"vp8.0\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":false},\"video/webm; codecs=\\\"vp8.0, vorbis\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":false},\"video/webm; codecs=\\\"vp8, opus\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":true},\"video/webm; codecs=\\\"vp9\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":true},\"video/webm; codecs=\\\"vp9, vorbis\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":true},\"video/webm; codecs=\\\"vp9, opus\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":true},\"video/x-matroska; codecs=\\\"theora\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"application/x-mpegURL; codecs=\\\"avc1.42E01E\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"video/ogg; codecs=\\\"dirac, vorbis\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"video/ogg; codecs=\\\"theora, speex\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"video/ogg; codecs=\\\"theora, vorbis\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"video/ogg; codecs=\\\"theora, flac\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"video/ogg; codecs=\\\"dirac, flac\\\"\":{\"canPlay\":\"\",\"mediaSource\":false},\"video/ogg; codecs=\\\"flac\\\"\":{\"canPlay\":\"probably\",\"mediaSource\":false},\"video/3gpp; codecs=\\\"mp4v.20.8, samr\\\"\":{\"canPlay\":\"\",\"mediaSource\":false}}",
    "video_codecs_extended_hash": "67b509547efe3423d32a3a70a2553c16",
    "media_query_dark_mode": false,
    "headless_browser_phantom": false,
    "headless_browser_selenium": false,
    "headless_browser_nightmare_js": false,
    "headless_browser_generic": [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
    ],
    "document__referrer": "https://iframe.arkoselabs.com/",
    "window__ancestor_origins": [
        "https://iframe.arkoselabs.com",
        "https://twitter.com",
    ],
    "window__tree_index": [
        0,
        0
    ],
    "window__tree_structure": "[[[]]]",
    "window__location_href": "https://client-api.arkoselabs.com/v2/2.3.3/enforcement.ead543e58132298fbbf74facbb131299.html#0152B4EB-D2DC-460A-89A1-629838B529C9&16f7bd8a-eb2e-48d3-bfa0-e53547ff8c71",
    "client_config__sitedata_location_href": "https://iframe.arkoselabs.com/0152B4EB-D2DC-460A-89A1-629838B529C9/index.html",
    "client_config__language": "en",
    "client_config__surl": "https://client-api.arkoselabs.com",
    "client_config__triggered_inline": false,
    "mobile_sdk__is_sdk": false,
    "audio_fingerprint": "124.04347527516074",
    "navigator_battery_charging": true,
    "navigator_permissions": [
        "geolocation: denied",
        "notifications: denied",
        "push: unsupported",
        "midi: denied",
        "camera: denied",
        "microphone: denied",
        "speaker: unsupported",
        "device-info: unsupported",
        "background-sync: granted",
        "bluetooth: unsupported",
        "persistent-storage: prompt",
        "ambient-light-sensor: unsupported",
        "accelerometer: granted",
        "gyroscope: granted",
        "magnetometer: granted",
        "clipboard: unsupported",
        "accessibility-events: unsupported",
        "clipboard-read: denied",
        "clipboard-write: denied",
        "payment-handler: granted"
    ],
    "math_fingerprint": "3b2ff195f341257a6a2abbc122f4ae67",
    "supported_math_functions": "e9dd4fafb44ee489f48f7c93d0f48163",
    "screen_orientation": "landscape-primary",
    "rtc_peer_connection": "function || function",
    "speech_default_voice": "Microsoft David - English (United States) || en-US",
    "speech_voices_hash": "b24bd471a2b801a80c0e3592b0c0c362"
};
function generateUUID() {
    const hexDigits = '0123456789abcdef';
    let uuid = '';

    for (let i = 0; i < 36; i++) {
        if (i === 8 || i === 13 || i === 18 || i === 23) {
            uuid += '-';
        } else if (i === 14) {
            uuid += '4';
        } else if (i === 19) {
            uuid += hexDigits[(Math.random() * 4 | 8)];
        } else {
            uuid += hexDigits[(Math.random() * 16 | 0)];
        }
    }

    return uuid;
}
function getEnhancedFingerprint(fp, ua, opts) {
    let fingerprint = { ...baseEnhancedFingerprint };
    let uuid = generateUUID();
    fingerprint.webgl_extensions = fingerprint.webgl_extensions.split(";").filter(_ => Math.random() > 0.2).join(";");
    fingerprint.webgl_extensions_hash = (0, murmur_1.default)(fingerprint.webgl_extensions, 0);
    fingerprint.screen_pixel_depth = fp.D;
    fingerprint.webgl_unmasked_vendor = webGLMetadata[Math.floor(Math.random() * webGLMetadata.length)].vendor;
    fingerprint.webgl_unmasked_renderer = webGLMetadata[Math.floor(Math.random() * webGLMetadata.length)].renderer;
    fingerprint.window_outer_height = fp.S[0];
    fingerprint.window_outer_width = fp.S[1];
    fingerprint.window_inner_height = 0;
    fingerprint.window_inner_width = 0;
    fingerprint.browser_detection_firefox = !!ua.match(/Firefox\/\d+/);
    fingerprint.browser_detection_brave = !!ua.match(/Brave\/\d+/);
    fingerprint.media_query_dark_mode = Math.random() > 0.9;
    let webglString = Object.entries(fingerprint)
        .filter(([key, value]) => key.startsWith("webgl_") && key !== "webgl_hash_webgl")
        .map(([key, value]) => (key === 'webgl_extensions' || value !== 'WEBGL_polygon_mode') ? `${key},${value}` : value)
        .join(",") + ',webgl_hash_webgl,';

    let webgl_hash_webgl = murmur_1.default(webglString, 0);
    fingerprint.webgl_hash_webgl = webgl_hash_webgl
    fingerprint.window__location_href = `${opts.surl}/v2/${opts.funcaptcha_file}#${opts.pkey}&${uuid}`;
    if (opts.site) {
        fingerprint.document__referrer = "https://iframe.arkoselabs.com/";
        fingerprint.window__ancestor_origins = ["https://iframe.arkoselabs.com", opts.site];
        fingerprint.client_config__sitedata_location_href = `https://iframe.arkoselabs.com/${opts.pkey}/index.html`;
    }
    fingerprint.audio_fingerprint = (124.04347527516074 + Math.random() * 0.001 - 0.0005).toString();
    return Object.entries(fingerprint).map(([k, v]) => ({ key: k, value: v }));
}
exports.default = {
    getFingerprint,
    prepareF,
    prepareFe,
    getEnhancedFingerprint,
};
