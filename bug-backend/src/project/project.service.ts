import { HttpException, HttpStatus, Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { project } from './project.entity';
import { CreateProjectDto } from './dto/createProjectDto';
import { UpdateProjectDto } from './dto/updateProjectDto';
import { ChangeDescription } from './dto/changedescriptionDto';
import { ChangeDateCompletion } from './dto/changeDateCompletionDto';
import { ChangeCategory } from './dto/changeCategoryDto';
import { AddCollaborator } from './dto/addCollaboratorDto';
import { UserService } from 'src/user/user.service';
import { user } from 'src/user/user.entity';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class ProjectService {
    constructor
    (
        @Inject(forwardRef(() => UserService)) private userService: UserService,
        @InjectRepository(project) private projectRepository: Repository<project>, private mailerService: MailerService,
        @InjectRepository(project) private userRepository: Repository<user>
    ) {}

    async createProject(project: CreateProjectDto) {
        const projectFound = await this.projectRepository.findOne({where: { name: project.name }})

        if(projectFound) {
            return new HttpException('Project already exist', HttpStatus.CONFLICT);
        }

        const newProject = this.projectRepository.create(project);
        this.projectRepository.save(newProject);
    }

    async getProjects() {
        return this.projectRepository.find();
    }

    async getProject(id: number) {
        const projectFound = await this.projectRepository.findOne({where: { id }})
        
        if(!projectFound) {
            return new HttpException('Project not found', HttpStatus.NOT_FOUND);
        }
    }

    async getProjectByName(name: string) {
        const nameProject = await this.projectRepository.findOne({ where: { name }})

        if(!nameProject) {
            throw new HttpException(`Project with name: ${name} not found`, HttpStatus.NOT_FOUND);
        }

        return nameProject;
    }

    async getProjectByUser(userName: string) {
        const nameProject = await this.userRepository.findOne({ where: { userName }})

        if(!nameProject) {
            throw new HttpException(`Project with name: ${name} not found`, HttpStatus.NOT_FOUND);
        }

        return nameProject;
    }

    public async getCollaboratorByProject(name: string) {
        const projectCollaborators: project = await this.getProjectByName(name)

        if(!projectCollaborators) {
            throw new HttpException(`Project with collaborators: ${projectCollaborators} not found`, HttpStatus.NOT_FOUND);
        }

        return projectCollaborators
    }

    async deleteProject(id: number) {
        const result = await this.projectRepository.delete({ id })

        if(result.affected === 0) {
            return new HttpException('Project not found', HttpStatus.NOT_FOUND);
        }

        return result;
    }

    async changeDescription(changeDescription: ChangeDescription) {
        const { name, newDescription } = changeDescription
        const project: project = await this.getProjectByName(name)

        project.description = newDescription

        await this.projectRepository.save(project)
    }

    async changeDate(changeDate: ChangeDateCompletion) {
        const { name, newDateCompletion } = changeDate
        const project: project = await this.getProjectByName(name)

        project.expectedCompletionAt = newDateCompletion

        await this.projectRepository.save(project)
    }

    async changeCategory(changeCategory: ChangeCategory) {
        const { name, newCategory } = changeCategory
        const project: project = await this.getProjectByName(name)

        project.category = newCategory

        await this.projectRepository.save(project)
    }
    
    async addCollaborator(addCollaborator: AddCollaborator) {
        const { name, collaborator } = addCollaborator
        const project: project = await this.getProjectByName(name)
        const user: user = await this.userService.getUserByUsername(collaborator)
        
        if (!project.collaborators) {
            project.collaborators = [];
        }
    
        if (!project.collaborators.includes(user.userName)) {
            project.collaborators.push(user.userName);
    
            await this.projectRepository.save(project);
        }
    }

    async updateProject(id: number, project: UpdateProjectDto) {
        const projectFound = await this.projectRepository.findOne({where: { id }});

        if(!projectFound) {
            return new HttpException('Project not found', HttpStatus.NOT_FOUND);
        }

        const updateProject = Object.assign(projectFound, project);
        return this.projectRepository.save(updateProject);
    }
}
