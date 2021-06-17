import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { LanguajeModel } from '../models/Languaje';
import { LanguajeService } from '../other-services/languaje.service';
import { DataGridFunctions } from '../utilities/data-grid-functions';

@Component({
  selector: 'app-manage-languajes',
  templateUrl: './manage-languajes.component.html',
  styleUrls: ['./manage-languajes.component.css']
})
export class ManageLanguajesComponent implements OnInit {
  selection: boolean = false;
  gridEdited: boolean = false;
  value = '';
  // columnApi: any;
  gridOptions: GridOptions;
  languajes: LanguajeModel[];
  languaje: LanguajeModel;

  columnDefs = [
    { field: 'languaje_Name', headerName: 'Idioma', colId: "0", width: 400, filter: "agTextColumnFilter", filterParams: DataGridFunctions.CodeFilterParams},
    {
      field: "Seleccionar",
      headerName: "Seleccionar",
      width: 200,
      colId: "1",
      checkboxSelection: true,
      editable: false,
      cellClass: "ag-check-cell",
    },
    { field: "Modified", colId: "2", hide: true },
    { field: "languaje_Id", colId: "3", hide: true },

  ];

  defaultColDef = {
    resizable: true,
    editable: true,
    singleClickEdit: true, enableCellChangeFlash: true, suppressMovable: true,
  }

  rowData: any = [];

  constructor(
    private languajeService: LanguajeService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.languajeService.getLanguajes().subscribe((res) => {
      console.log(res);
      this.rowData = res;
    });
  }

  ngAfterContentInit() {
    this.gridOptions = {
      onGridReady: function (params) {
        this.api = params.api;
        this.columnApi = params.columnApi;
        console.log("The grid is ready!");
        this.api.sizeColumnsToFit();
      },
      onGridSizeChanged: function (params) {
        this.api.sizeColumnsToFit();
      },
      onComponentStateChanged: function (params) {
        this.api.sizeColumnsToFit();
      },
    };
    // this.gridOptions.onCellValueChanged = this.onCellValueChanged;
  }

  onCellValueChanged(params) {
    this.gridEdited = true;
    var node;
    node = params.node;
    if (this.gridOptions.api.getValue("2", node) != "New") {
      node.setDataValue("2", "true");
    }
  }

  onSelectionChanged(event) {
    if (this.gridOptions.api.getSelectedRows().length == 1) {
      this.selection = true;
    } else {
      this.selection = false;
    }
  }

  onAddRow() {
    const newRows = [
      {
        languaje_Name: "",
        Modified: "New",
      },
    ];
    this.gridOptions.api.applyTransaction({ add: newRows });
  }

  onDeleteRow() {
    var selectedRows = this.gridOptions.api.getSelectedRows();
    var selectedNodes = this.gridOptions.api.getSelectedNodes();
    for(let row of selectedRows) {
      this.languajeService.deleteLanguaje(row.languaje_Id).subscribe(res => {
        this.gridOptions.api.applyTransaction({ remove: selectedRows });
      }, err => {
        window.alert("Hubo un error al borrar el registro")
      });
    }
  }

  onSaveChanges() {
    var row;
    var modifiedRows: Array<number> = [];
    for (let i = 0; i < this.gridOptions.api.getDisplayedRowCount(); i++) {
      row = this.gridOptions.api.getDisplayedRowAtIndex(i);
      if (this.gridOptions.api.getValue("2", row) == "true") {
        modifiedRows.push(i);
      }
    }
    var row2;
    for (let x of modifiedRows) {
      this.languaje = new LanguajeModel();
      row2 = this.gridOptions.api.getDisplayedRowAtIndex(x);
      this.languaje.languaje_Id = this.gridOptions.api.getValue("3", row2);
      this.languaje.languaje_Name = this.gridOptions.api.getValue("0", row2);
      this.languajeService.updateLanguaje(this.languaje, this.languaje.languaje_Id).subscribe(res => {
        window.alert("Se ha modificado correctamente")
        //this.gridOptions.api.forEachNode(node => node.setDataValue("6", ""))
      }, err => {
        window.alert("Ha ocurrido un fallo en la modificacion")
      }
      );
      // console.log()
      console.log(JSON.stringify(this.languaje));
    }

    var row3;
      var newRows: Array<number> = [];
      for (let j = 0; j < this.gridOptions.api.getDisplayedRowCount(); j++) {
        row3 = this.gridOptions.api.getDisplayedRowAtIndex(j);
        if (this.gridOptions.api.getValue("2", row3) == "New") {
          newRows.push(j);
        }
      }
      var row4;
      for (let y of newRows) {
        this.languaje = new LanguajeModel();
        row4 = this.gridOptions.api.getDisplayedRowAtIndex(y);
        this.languaje.languaje_Name = this.gridOptions.api.getValue("0", row4);
        console.log(JSON.stringify(this.languaje));
        this.languajeService.createLanguaje(this.languaje).subscribe(res => {
          window.alert("Se ha insertado correctamente")
          //this.gridOptions.api.forEachNode(node => node.setDataValue("6", ""))
        }, err => {
          window.alert("Ha ocurrido un fallo en la insercion")
        }
        )
      }
  }

  onExportToCSV() {
    this.gridOptions.api.exportDataAsCsv();
  }
}
