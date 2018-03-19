var $ = require('../../utils/ajax.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize: 8,
    pageNum: 1,
    videoIntros: [],
    canLoadMore: '1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMovies(this.data.pageNum, this.data.pageSize);
  },

  /**
   * 加载视频数据
   */
  loadMovies: function (pageNum, pageSize) {
    var that = this;
    $.get({
      url: "http://www.yanda123.com/yanda/movie/list",
      data: { pageNum: pageNum, pageSize: pageSize }
    }).then((res) => {
      if (res.data.status === 200) {
        let movies = res.data.data.list,
          pageNum = that.data.pageNum;
        
        movies.length >= 8 ? (pageNum++) : (that.setData({ canLoadMore: '0' }));
        that.groupvideoIntros({
          movies: movies,
          pageNum: pageNum
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  },
  /**
   * 组合 videoStations 数据
   */
  groupvideoIntros(data) {
    let videoIntros = this.data.videoIntros,
      movies = data.movies,
      pageNum = data.pageNum;
    for (let i = 0; i < movies.length; i++) {
      let movie = movies[i];
      movie.imgUrl = 'http://www.yanda123.com/yanda/attach/readFile?size=500&id=' + movies[i].imgAppendixId;
      videoIntros.push(movie);
    }
    this.setData({
      videoIntros: videoIntros,
      pageNum: pageNum
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})