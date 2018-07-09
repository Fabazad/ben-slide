import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {

	this.mainVideos = ['test.mp4', 'history-luxury.mp4'];
	this.leftAssets = ['right-screen.png', 'right-screen.png'];
	this.rightAssets = ['right-screen.png', 'right-screen.png'];

	this.page = new ReactiveVar(0);
 	 // counter starts at 0
	this.played = new ReactiveVar(false);
	this.ended = new ReactiveVar(false);
	this.showRightAsset = new ReactiveVar(false);
	this.showLeftAsset = new ReactiveVar(false);
});

Template.hello.onRendered(function(){

});

Template.hello.helpers({
  showRightAsset() {
    return Template.instance().showRightAsset.get();
  },
  showLeftAsset() {
    return Template.instance().showLeftAsset.get();
  },
  mainVideo(){
  	var self = Template.instance();
  	return self.mainVideos[self.page.get()];
  },
  leftAsset(){
  	var self = Template.instance();
  	return self.leftAssets[self.page.get()];
  },
  rightAsset(){
  	var self = Template.instance();
  	return self.rightAssets[self.page.get()];
  }
});

Template.hello.events({
    'click .main-video'(event, instance) {
    	var self = Template.instance();
    	var target = event.target;

	    if(!self.played.get()){
		    target.play();
		    fullscreen();
		    self.played.set(true);
		}
		else if(self.ended.get()){
			self.page.set(self.page.get() + 1);
			self.ended.set(false);
			console.log(self.page.get());
			self.showRightAsset.set(false);
  			self.showLeftAsset.set(false);
  			setTimeout(function(){
  				target.play();
  			},100);
		}
    
  	},
  	'ended .main-video'(event){
  		var self = Template.instance();
  		self.showRightAsset.set(true);
  		self.showLeftAsset.set(true);
  		self.ended.set(true);  	  	
  	},
  	'click .side-asset.right'(event){
  		$(".side-asset.right").attr("style","opacity:1");
  		$(".side-asset.right").get(0).play();
  	},
  	'click .side-asset.left'(event){
  		$(".side-asset.left").attr("style","opacity:1");
  		$(".side-asset.left").get(0).play();
  	}
});

function fullscreen(){
	var monElement = document.getElementById("body");
  	if (document.mozFullScreenEnabled) {
		if (!document.mozFullScreenElement) {
	          monElement.mozRequestFullScreen();
	        } else {
	          document.mozCancelFullScreen();
	        }
	      }
	      if (document.fullscreenElement) {
		if (!document.fullscreenElement) {
	          monElement.requestFullscreen();
	        } else {
	          document.exitFullscreen();
	        }
	      }
	      if (document.webkitFullscreenEnabled) {
		if (!document.webkitFullscreenElement) {
	          monElement.webkitRequestFullscreen();
	        } else {
	          document.webkitExitFullscreen();
	        }
	      }
	      if (document.msFullscreenEnabled) {
		if (!document.msFullscreenElement) {
	          monElement.msRequestFullscreen();
	        } else {
	          document.msExitFullscreen();
	        }
    }
}
