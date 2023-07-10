"use strict"

const { isBrowser, isWebWorker, isNode } = require("browser-or-node")

module.exports = ({ browser, worker, node, fallback }) => {
    if (isBrowser) return browser || fallback
    if (isWebWorker) return worker || fallback
    if (isNode) return node || fallback
    return fallback
}
