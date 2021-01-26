extern crate cfg_if;
extern crate wasm_bindgen;

mod utils;

use serde_json::json;
use cfg_if::cfg_if;
use wasm_bindgen::prelude::*;


cfg_if! {
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

#[wasm_bindgen]
pub fn decode(input: String) -> String {
    match bottomify::bottom::decode_string(&format!("{}", input)) {
         Ok(e) => json!({"status": true, "description": e}).to_string(),
         Err(e) => json!({"status": false, "description": format!("{}", e)}).to_string()
    }
}

#[wasm_bindgen]
pub fn encode(input: String) -> String {
    bottomify::bottom::encode_string(&format!("{}", input))
}