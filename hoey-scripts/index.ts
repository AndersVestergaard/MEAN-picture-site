
class Index {

    static mediaPlayers: { id: string, element: HTMLVideoElement, dataLoaded: boolean }[];
    static main() {
        this.mediaPlayers = [{ id: "media-player1", element: null, dataLoaded: false },
        { id: "media-player2", element: null, dataLoaded: false },
        { id: "media-player4", element: null, dataLoaded: false }];
        document.addEventListener("DOMContentLoaded", function () { Index.initVideos(); }, false);
    }


    static initVideos(): void {
        for (var i = 0; i < this.mediaPlayers.length; i++) {
            this.mediaPlayers[i].element = document.getElementById(this.mediaPlayers[i].id) as HTMLVideoElement;
            if (this.mediaPlayers[i].element != null) {
                this.mediaPlayers[i].element.controls = false;
                this.mediaPlayers[i].element.loop = true;
                this.mediaPlayers[i].element.onloadeddata =  () => Index.videoLoaded();
            }

        }
    }

    private static videoLoaded() {
        //Test if all video data is loaded if true play
        if (Index.isAllVideosLoaded()) {
            for (var i = 0; i < this.mediaPlayers.length; i++) {
                this.mediaPlayers[i].element.play();
            }
        }
    }

    private static isAllVideosLoaded() {
        for (var i = 0; i < this.mediaPlayers.length; i++) {
            if (this.mediaPlayers[i].element == null || !(this.mediaPlayers[i].element.readyState === 4)) {
                return false;
            }
        }
        return true;

    }



}
Index.main();
