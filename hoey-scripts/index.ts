class Index{

    public static main(): number {
        console.log('Hello World');
        var u = "Msg to beaware of reload bug - only dev";
        for(var i = 0; i < 10; i++){
            console.log(u);
        }

        return 0;
    }

}
Index.main();