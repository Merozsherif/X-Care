import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loading: boolean = true;
  blogs_list: any = [];
  user: any = ''
  comments: any = [];
  slug: any = ''
  body: any = '';
  base64Image: any;
  file!: File | any;
  uploadVideo: boolean = false;
  blogList:any=[
    [
      '../../../../assets/img/blog1.jpeg',
      '../../../../assets/img/blog2.jpeg',
      '../../../../assets/img/blog3.jpeg',
      '../../../../assets/img/blog4.jpeg',
    ],
    [
      '../../../../assets/img/blog5.jpeg',
      '../../../../assets/img/blog6.jpeg',
      '../../../../assets/img/blog7.jpeg',
      '../../../../assets/img/blog8.jpeg',
    ],
  ]
  constructor(private blogs: AppService, private authentication: AuthService, private toastr: ToastrService,) {

  }
  select(event: any) {
    this.uploadVideo = false
    this.file = <File>event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.base64Image = reader.result;
      // console.log(this.base64Image);
      // console.log(this.file);
    };
  };
  selectVideo(event: any) {
    this.uploadVideo = true
    this.file = <File>event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = () => {
      this.base64Image = reader.result;
      // console.log(this.base64Image);
      // console.log(this.file);


    };
  };
  ngOnInit(): void {


    this.user = this.authentication.currentUserValue
    Aos.init();
    this.getblogs()
  }

  getblogs() {
    this.blogs.showBlogs().subscribe((res: any) => {
      this.blogs_list = res;
      const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'wmv', 'webm'];

      this.blogs_list.forEach((blog: any) => {
        blog.video = false;
        blog.userReaction = null; // Initialize userReaction
        if (blog.media_file) {
          const extension = blog.media_file.split('.').pop().toLowerCase();
          if (videoExtensions.includes(extension)) {
            blog.video = true;
          }
        }
      });

      this.loading = false;
    });
  }
  // getblogs() {
  //   this.blogs.showBlogs().subscribe((res: any) => {
  //     // console.log(res);
  //     this.blogs_list = res
  //     const videoExtensions = ['mp4', 'mov', 'avi', 'mkv', 'wmv', 'webm'];

  //     this.blogs_list.map((blog: any) => {
  //       return blog.video = false
  //       // const extension = blog.media_file.split('.').pop().toLowerCase();
  //     })
  //     this.blogs_list.map((blog: any) => {
  //       // return blog.video=false
  //       if (blog.media_file) {
  //         const extension = blog.media_file.split('.').pop().toLowerCase();
  //         if (videoExtensions.includes(extension)) {
  //           return blog.video = true;
  //         }
  //       }

  //     })
  //     console.log(this.blogs_list);


  //     this.loading = false
  //   })
  // }

  updateReaction(item: any, reaction: 'like' | 'dislike') {
    let form = {
        profile: this.user.profile_id,
        blog_post: item.id
    };

    this.blogs[reaction](form).subscribe((res: any) => {
        if (res.msg) {
            this.toastr.info('', res.msg, {
                closeButton: true,
                tapToDismiss: true,
                disableTimeOut: false,
                timeOut: 3000
            });
            // Update likes and dislikes based on the response
            item.likes = res.likes;
            item.dislikes = res.dislike;
        } else {

            this.toastr.error('An error occurred while updating your reaction.');
        }
    });
}

like(item: any) {
    this.updateReaction(item, 'like');
}

dislike(item: any) {
    this.updateReaction(item, 'dislike');
}



  // updateReaction(item: any, reaction: 'like' | 'dislike') {
  //   let form = {
  //     profile: this.user.profile_id,
  //     blog_post: item.id
  //   };


  //   let alreadyLiked = item.userReaction === 'like';
  //   let alreadyDisliked = item.userReaction === 'dislike';

  //   // Check if the user wants to remove the reaction
  //   let removeReaction = (alreadyLiked && reaction === 'like') || (alreadyDisliked && reaction === 'dislike');

  //   this.blogs[reaction](form).subscribe((res: any) => {
  //     if (res.msg) {
  //       this.toastr.info('', res.msg, {
  //         closeButton: true,
  //         tapToDismiss: true,
  //         disableTimeOut: false,
  //         timeOut: 3000
  //       });
  //       item.userReaction = null; // Reset user's reaction
  //       item[reaction === 'like' ? 'likes' : 'dislikes'] = parseInt(item[reaction === 'like' ? 'likes' : 'dislikes']) - 1;
  //       if (!removeReaction) {
  //         // Increment the respective counter
  //         item[reaction === 'like' ? 'likes' : 'dislikes'] = parseInt(item[reaction === 'like' ? 'likes' : 'dislikes']) + 1;
  //         item.userReaction = reaction; // Update user's reaction
  //       }// else {
  //         // Decrement the respective counter
  //        // item[reaction === 'like' ? 'likes' : 'dislikes'] = parseInt(item[reaction === 'like' ? 'likes' : 'dislikes']) - 1;
  //       //}
  //     } else {
  //       this.toastr.info('', `${reaction.charAt(0).toUpperCase() + reaction.slice(1)}d the post`, {
  //         closeButton: true,
  //         tapToDismiss: true,
  //         disableTimeOut: false,
  //         timeOut: 3000
  //       });

  //       if (alreadyLiked && reaction === 'dislike') {
  //         item.likes = parseInt(item.likes) - 1;
  //         item.dislikes = parseInt(item.dislikes) + 1;
  //         item.userReaction = 'dislike';
  //       } else if (alreadyDisliked && reaction === 'like') {
  //         item.dislikes = parseInt(item.dislikes) - 1;
  //         item.likes = parseInt(item.likes) + 1;
  //         item.userReaction = 'like';
  //       } else {
  //         if (!removeReaction) {
  //           item[reaction === 'like' ? 'likes' : 'dislikes'] = parseInt(item[reaction === 'like' ? 'likes' : 'dislikes']) + 1;
  //           if (reaction === 'like') {
  //             item.userReaction = 'like';
  //           } else {
  //             item.userReaction = 'dislike';
  //           }
  //         }
  //       }
  //     }
  //   });
  // }

  // like(item: any) {
  //   this.updateReaction(item, 'like');
  // }

  // dislike(item: any) {
  //   this.updateReaction(item, 'dislike');
  // }



  getComments(item: any) {
    this.comments = []
    this.slug = item.slug
    console.log(this.slug)
    this.blogs.comments(item.id).subscribe((res: any) => {
      // console.log(res);
      this.comments = res
    })
  }
  addComment(item: any) {
    let form = {
      profile: this.user.profile_id,
      blog_post: item.id,
      body: this.body
    }
    this.blogs.addComments(item.id, form).subscribe((res: any) => {
      // console.log(res);
      if (res.message) {
        this.toastr.error('', res.message, {
          closeButton: true,
          tapToDismiss: true,
          disableTimeOut: false,
          timeOut: 3000
        });

      } else {
        this.toastr.info('', 'add comment to post', {
          closeButton: true,
          tapToDismiss: true,
          disableTimeOut: false,
          timeOut: 3000
        });
      }
      this.blogs.comments(item.id).subscribe((res: any) => {
        // console.log(res);
        this.comments = res
      })
      this.body = ''
    })
  }
  addPost() {

    let form = {
      doctor: this.user.doctor_id,
      body: this.body,
      media_file: this.file ? this.file : '',
      category_id: 3

    }
    this.blogs.addpost(form).subscribe((res: any) => {
      // console.log(res);
      this.toastr.info('', 'The Post Is added successfully', {
        closeButton: true,
        tapToDismiss: true,
        disableTimeOut: false,
        timeOut: 3000
      });
      this.body = '';
      this.file = '';
      this.base64Image = ''
      this.getblogs()
    })
  }
}
