import{E as e,e as t}from"./index-4f0251ba.js";function r(){window.localStorage.removeItem("logged_in_user"),window.localStorage.removeItem("logged_in_type"),e.logout(),t.logout()}async function n(o){if(o.type=="error"&&o.auth==!1)return r(),"success"}export{n as u};
