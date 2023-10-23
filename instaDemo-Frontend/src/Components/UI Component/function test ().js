function test () {
    function test11 (test) {
        console.log("test --> ", test)
    }
    test2({test11})
}

function test2 ({test11}) {
    test11("sdsf")
}

test()