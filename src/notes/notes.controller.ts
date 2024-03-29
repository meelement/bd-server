import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { FindOneParamsDto } from '../validation/dto/find-one-params.dto';
import { DeleteResult } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@ApiTags('Заметки')
@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @ApiOperation({ summary: 'Получить все заметки' })
  @ApiResponse({ status: HttpStatus.OK, type: [Note] })
  @Get()
  getAll(): Promise<Note[]> {
    return this.notesService.getAll();
  }

  @ApiOperation({ summary: 'Получить заметку по id' })
  @ApiResponse({ status: HttpStatus.OK, type: Note })
  @Get(':id')
  getById(@Param() { id }: FindOneParamsDto): Promise<Note> {
    return this.notesService.getById(id);
  }

  @ApiOperation({ summary: 'Создать заметку' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Note })
  @Post()
  create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    return this.notesService.create(createNoteDto);
  }

  @ApiOperation({ summary: 'Обновить заметку' })
  @ApiResponse({ status: HttpStatus.OK, type: Note })
  @Patch(':id')
  update(
    @Param() { id }: FindOneParamsDto,
    @Body() updateNoteDto: UpdateNoteDto,
  ): Promise<Note> {
    return this.notesService.update(id, updateNoteDto);
  }

  @ApiOperation({ summary: 'Удалить заметку' })
  @ApiResponse({ status: HttpStatus.OK, type: DeleteResult })
  @Delete(':id')
  remove(@Param() { id }: FindOneParamsDto): Promise<DeleteResult> {
    return this.notesService.remove(id);
  }
}
