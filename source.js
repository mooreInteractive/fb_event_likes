(function () {
    var loader = document.getElementById('pagelet_group_pager');

    function checkScrollDone() {
        if (loader.firstChild.firstChild != null) {
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(function () {
                checkScrollDone();
				console.log('Scrolled one page.');
            }, 1000);
        } else {
            finishParsing();
			console.log('Scrolling done.');
        }
    }
    checkScrollDone();

    function finishParsing() {
		console.log('Parsing posts...');
        var looks = document.querySelectorAll('#event_wall .mbm .commentable_item .UFIContainer .UFILikeSentenceText a[rel=dialog]'),
			posts = document.querySelectorAll('#event_wall .mbm'),
            array = [],
            x = document.createElement('div'),
			infoBox = document.createElement('div');
		x.id = 'looksContainer';
		infoBox.id = 'looksInfo';
		infoBox.innerHTML = '<p>Found <span style="color: #2323de; font-size: 14pt; padding: 0 5px; ">'+looks.length+'</span> looks with Likes.<br />There were '+posts.length+' posts in total.<br />Posts with no likes are hidden.</p>';
		console.log('Found '+looks.length+' posts with likes.');
        for (var i = 0; i < looks.length; i++) array[array.length] = looks[i];
        array.sort(function (a, b) {
            return parseInt(b.text) - parseInt(a.text);
        });
        for (i = 0; i < array.length; i++) {
            try {
				var rankBox = document.createElement('div');
				rankBox.innerHTML = '<p class="rankBox"><span class="score"> '+(i+1)+' </span> with '+parseInt(array[i].text)+' likes.</p>';
				x.appendChild(rankBox);
				x.appendChild(document.getElementById('mall_post_' + (array[i].getAttribute('ajaxify').split('=')[1].split('&')[0]) + ':6'));
            } catch (err) {}
        }
        document.body.innerHTML = '';
        document.body.appendChild(infoBox);
		document.body.appendChild(x);
        document.styleSheets[0].insertRule('#looksInfo {width: 640px; padding: 10px; margin: 25px; background: #f6f6f7; border: solid 1px #131313;}', 0);
		document.styleSheets[0].insertRule('#looksContainer {width: 640px; margin: 45px;}', 0);
		document.styleSheets[0].insertRule('.rankBox {width: 640px; margin: 10px 0 0 0; background: #f6f7f7; border: solid 1px #000000; border-bottom: none;}', 0);
		document.styleSheets[0].insertRule('.rankBox .score {font-size: 15pt; color: #1313de; padding: 5px;}', 0);
    }
})()
