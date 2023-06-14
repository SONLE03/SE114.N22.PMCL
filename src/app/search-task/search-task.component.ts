import { ChangeDetectorRef, Component } from "@angular/core";
import { TaskService } from "~/app/service/task.service";
import { DatePipe } from '@angular/common'
import { Location } from '@angular/common'
import * as camera from "@nativescript/camera";
import { ImageAsset } from "@nativescript/core";
import { ImageSource, knownFolders} from '@nativescript/core';
import { mergeMap, map } from 'rxjs/operators';
import { Subscription, interval } from 'rxjs';
import * as imagepicker from "@nativescript/imagepicker";
import { Router } from "@angular/router";
import { Dialogs } from '@nativescript/core'


@Component ({
    selector: "search-task",
    templateUrl: "./search-task.component.html",
    styleUrls: ['./search-task.component.css'],
    moduleId: module.id,
})

export class SearchTaskComponent {
  task_name : string;
  checklist_id : number;

  public tasks : Array<any>;
  public results : Array<any>;
  private updateSubscription: Subscription;
  constructor(  public location: Location,
                public router: Router,
                public taskService: TaskService,
                public cdRef: ChangeDetectorRef,
                public datepipe: DatePipe,
    ){this.tasks = this.taskService.getTasks()};

  back_previous_page()
  {
      this.location.back()
  }
  startfind()
  {
    this.results = [];
    let j = 0;
    for(let i = 0; i< this.tasks.length;i++)
    {
      let text = this.tasks[i].name;
      if(text.includes(this.task_name) == true)
      {
        this.results[j] = this.tasks[i];
        j++;
      //   Dialogs.confirm({
      //     title: this.tasks[i].name,
      //     message: "Your message",
      //     okButtonText: "Your button text",
      //     cancelButtonText: "Cancel text",
      //     neutralButtonText: "Neutral text"
      // }).then(result => {
      //     // result argument is boolean
      //     console.log("Dialog result: " + result);
      // });
      }
    }
  }
}
