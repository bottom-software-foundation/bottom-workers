addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a request
 * @param {Request} request
 */
async function handleRequest(request) {
    const { encode, decode } = wasm_bindgen;
    await wasm_bindgen(wasm)
    const url = new URL(request.url);
    if (url.pathname === "/encode") {
      let param1 = url.searchParams.get('text');
      if (param1) {
        param1 = param1.toString();
        try {
          const encoded = encode(param1);
          return new Response(JSON.stringify({encoded: encoded}), {status: 200, headers: {"content-type": "application/json;charset=UTF-8"}})
        } catch (error) {
          return new Response(JSON.stringify({message: error.toString()}), {status: 500, headers: {"content-type": "application/json;charset=UTF-8"}})
        }
      
      } else {
        return new Response(JSON.stringify({message: `Missing Parameter Text`}), {status: 400, headers: {"content-type": "application/json;charset=UTF-8"}})
      }
    } else if (url.pathname === "/decode") {
      let param1 = url.searchParams.get('bottom');
      if (param1) {
        param1 = param1.toString();
        try {
          var decoded = decode(param1);
          decoded = JSON.parse(decoded);
          if (decoded.status) {
          return new Response(JSON.stringify({decoded: decoded.description}), {status: 200, headers: {"content-type": "application/json;charset=UTF-8"}})
          } else {
            return new Response(JSON.stringify({message: decoded.description}), {status: 400, headers: {"content-type": "application/json;charset=UTF-8"}})
          }
        } catch (error) {
          return new Response(JSON.stringify({message: error.toString()}), {status: 500, headers: {"content-type": "application/json;charset=UTF-8"}})
        }
        
      } else {
        return new Response(JSON.stringify({message: `Missing Parameter bottom`}), {status: 400, headers: {"content-type": "application/json;charset=UTF-8"}})
      }
    } else if (url.pathname === "/") {
      return new Response(JSON.stringify({message: "API help", encode: "To encode use GET https://bottom.daggy.workers.dev/encode?text=whatever you wnat to encode", decode: "To decode use GET https://bottom.daggy.workers.dev/decode?bottom=bottom"}), {status: 200, headers: {"content-type": "application/json;charset=UTF-8"}})
    } else {
      return new Response(JSON.stringify({message: `${url.pathname} Does not exist`}), {status: 404, headers: {"content-type": "application/json;charset=UTF-8"}})
    }
}
