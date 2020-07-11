import { Student } from './../../shared/student';
import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  StudentData: any = [];
  dataSource = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) pagniator: MatPaginator;
  displayedColumns: string[] = ['_id', 'student_name', 'student_email', 'section', 'action'];

  constructor(private studentApi: ApiService) { 
    this.studentApi.GetStudents().subscribe(data => {
      this.StudentData = data;
      this.dataSource = new MatTableDataSource<Student>(this.StudentData);
      setTimeout(() => {
        this.dataSource.paginator = this.pagniator;
      }, 0);
    })
  }

  ngOnInit(): void {
  }

  deleteStudent(index: number, e) {
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.pagniator.pageIndex * this.pagniator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.studentApi.DeleteStudent(e.id).subscribe()
    }
  }
}
