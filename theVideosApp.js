'use strict'

var app = angular.module('theVideos', ['ngSanitize']);

app.controller('videoPlayer', ['$scope', '$sce', '$timeout', '$document', function($scope, $sce, $timeout, $document) {
	        var controller = this;
            controller.currentVideo = 0;
            controller.editMode = {
            	mode: false,
            	index: -1
            };
            controller.videoPlayer = angular.element(document.querySelector('#the-video'));
            controller.addContainer = {
            	videoId: null,
            	startTime: null,
            	endTime: null,
            	name: null
            };
            $scope.clips = [
            	{
            		videoId: 1,
            		startTime: '10',
            		endTime: '30',
            		name: 'Bucky 1',
            		sources: [
	                    {src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov', type: "video/mp4"},
	                    {src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_stereo.ogg', type: "video/ogg"}
	                ]
            	},
            	{
            		videoId: 0,
            		startTime: '0',
            		endTime: '30',
            		name: 'Space 1',
            		sources: [
	                    {src: 'http://static.videogular.com/assets/videos/videogular.mp4', type: "video/mp4"},
	                    {src: 'http://static.videogular.com/assets/videos/videogular.webm', type: "video/webm"},
	                    {src: 'http://static.videogular.com/assets/videos/videogular.ogg', type: "video/ogg"}
	                ]
            	}
            ];
            controller.videos = [
	            {
	                videoId: 0,
	                name: 'default',
	                sources: [
	                    {src: 'http://static.videogular.com/assets/videos/videogular.mp4', type: "video/mp4"},
	                    {src: 'http://static.videogular.com/assets/videos/videogular.webm', type: "video/webm"},
	                    {src: 'http://static.videogular.com/assets/videos/videogular.ogg', type: "video/ogg"}
	                ]
	            },
	            {
	            	videoId: 1,
	            	name: 'Big Buck Bunny',
	                sources: [
	                    {src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov', type: "video/mp4"},
	                    {src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_stereo.ogg', type: "video/ogg"}
	                ]

	            }
	        ];
            controller.playClips = function(){
            	controller.videoPlayer[0].play();
            };
            controller.setVideo = function(index) {
            	controller.videoPlayer[0].pause();
                controller.currentVideo = index;
                controller.videoPlayer[0].src = controller.createVideoSource(controller.videos[$scope.clips[index].videoId].sources[0], $scope.clips[index].startTime);
                controller.videoPlayer[0].load();
                controller.videoPlayer[0].play();
            };

            controller.addVideo = function(){
            	controller.addContainer.videoId = parseInt(controller.addContainer.videoId.videoId);
            	controller.addContainer.sources = controller.videos[controller.addContainer.videoId].sources;
            	if(controller.editMode.mode){
            		controller.resetEditMode();
            	}
            	else{
            		$scope.clips.push(controller.addContainer);
            	}
            	controller.clearForm();
            };
            controller.getClips = function(){
            	return $scope.clips;
            };
            controller.createVideoSource = function(src, start){
            	return src.src + '#t=' + start;
            };
            controller.wrapResourceUrl = function(url){
            	return $sce.trustAsResourceUrl(url);
            }
            controller.editClip = function(index){
            	controller.addContainer = $scope.clips[index];
            	controller.addContainer.videoId = controller.videos[$scope.clips[index].videoId];
            	controller.editMode = {
            		mode: true,
            		index: index
            	};
            }
            controller.clearForm = function(){
            	controller.addContainer = {
            		videoId: null,
            		startTime: null,
            		endTime: null,
            		sources: [],
            		name: null
            	};
            };
            controller.deleteClip = function(index){
            	$scope.clips.splice($scope.clips.indexOf(index));
            };
            controller.resetEditMode = function(){
            	controller.editMode = {
            		mode: false,
            		index: -1
            	};
            };
            controller.playClips();
}]);

angular.element(document).ready(function() {
    var appDiv = document.getElementById('theVideos');
    var template = document.getElementById('bootstrapTemplate');
    setTimeout(function() {
    	appDiv.innerHTML = template.innerHTML;
        angular.bootstrap(angular.element(appDiv), ['theVideos']);
    }, 1000);
});

